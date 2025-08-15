# backend/predictions/views.py

from django.shortcuts import get_object_or_404
import subprocess

from predictions.ml.utils_recommend import recommend_next_challenge
from rest_framework import status, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from users.models import UserProfile
from .models import Challenge, Language, Submission
from .serializers import ChallengeSerializer, LanguageSerializer

# your ML import

@api_view(["GET"])
@permission_classes([AllowAny])
def languages_for_company(request):
    """
    GET ?company=<slug>
    Return distinct languages that have challenges for a given company.
    """
    company = request.query_params.get("company")
    if not company:
        return Response({"detail": "company parameter required"},
                        status=status.HTTP_400_BAD_REQUEST)

    langs = (
        Language.objects
                .filter(challenges__company__slug=company)
                .distinct()
                .order_by("name")
    )
    return Response(LanguageSerializer(langs, many=True).data)


class ChallengeList(generics.ListAPIView):
    """
    GET ?company=<slug>&language=<slug>
    List all challenges filtered by company and/or language.
    """
    serializer_class = ChallengeSerializer

    def get_queryset(self):
        qs = Challenge.objects.all()
        company  = self.request.query_params.get("company")
        language = self.request.query_params.get("language")
        if company:
            qs = qs.filter(company__slug=company)
        if language:
            qs = qs.filter(language__slug=language)
        return qs.order_by("title")


@api_view(["POST"])
@permission_classes([AllowAny])
def execute_code(request):
    """
    Execute code snippet in sandboxed subprocess.
    Supported languages: python, javascript.
    """
    code     = request.data.get("code")
    language = request.data.get("language", "").lower()
    if not code or not language:
        return Response({"error": "Code and language are required."},
                        status=status.HTTP_400_BAD_REQUEST)

    if language == "python":
        cmd = ["python3", "-c", code]
    elif language == "javascript":
        cmd = ["node", "-e", code]
    else:
        return Response({"error": "Unsupported language."},
                        status=status.HTTP_400_BAD_REQUEST)

    try:
        result = subprocess.run(cmd, capture_output=True,
                                text=True, timeout=5)
        output = result.stdout.strip() or None
        error  = result.stderr.strip() or None
        return Response({"output": output, "error": error})
    except subprocess.TimeoutExpired:
        return Response({"error": "Code execution timed out."},
                        status=status.HTTP_408_REQUEST_TIMEOUT)
    except Exception as e:
        return Response({"error": f"Unexpected error: {str(e)}"},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["GET"])
@permission_classes([AllowAny])
def get_challenge_detail(request, slug):
    """
    Fetch a single challenge by its slug.
    """
    challenge = get_object_or_404(Challenge, slug=slug)
    return Response(ChallengeSerializer(challenge).data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def submit_challenge(request, slug):
    """
    Submit code for a challenge, award XP on success, and update ML model.
    """
    user      = request.user
    profile   = user.profile
    challenge = get_object_or_404(Challenge, slug=slug)
    code      = request.data.get("code", "")
    lang      = request.data.get("language", "").lower()

    # 1) Run the code
    if lang == "python":
        cmd = ["python3", "-c", code]
    elif lang == "javascript":
        cmd = ["node", "-e", code]
    else:
        return Response({"error": "Unsupported language"},
                        status=status.HTTP_400_BAD_REQUEST)

    try:
        proc   = subprocess.run(cmd, capture_output=True,
                                text=True, timeout=5)
        output = proc.stdout.strip()
    except subprocess.TimeoutExpired:
        return Response({"error": "Execution timed out."},
                        status=status.HTTP_408_REQUEST_TIMEOUT)

    # 2) Record result & award XP
    correct = (output == challenge.expected_output.strip())
    Submission.objects.create(
        user=user,
        challenge=challenge,
        code=code,
        result="correct" if correct else "wrong"
    )
    if correct:
        profile.add_xp(challenge.xp_reward)

    return Response({
        "correct": correct,
        "xp":      profile.xp,
        "rank":    profile.rank,
    })


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def recommend_challenge(request):
    """
    Return a valid topic-slug every time.
    If the ML model errors, fall back to the first module__slug in your DB.
    """
    profile   = getattr(request.user, "profile", None)
    quiz_data = getattr(profile, "quiz_responses", {}) or {}
    # prefer explicit language param or last‐key in quiz_data
    lang = (request.query_params.get("language", "").lower()
            or next(iter(quiz_data.keys()), "")
           )

    answers = quiz_data.get(lang, {})

    # build features
    try:
        months_experience = int(answers.get("months_experience", 0))
    except:
        months_experience = 0
    xp = getattr(profile, "xp", 0)

    # compute quiz_score
    scores = []
    for v in answers.values():
        if isinstance(v, (int, float)):
            scores.append(v)
        elif isinstance(v, dict):
            if isinstance(v.get("score"), (int, float)):
                scores.append(v["score"])
            elif "correct" in v:
                scores.append(1 if v["correct"] else 0)
    quiz_score = float(sum(scores) / len(scores)) if scores else 0.0

    try:
        last_rate = float(answers.get("last_rate", 0.0))
    except:
        last_rate = 0.0

    features = {
        "months_experience": months_experience,
        "xp":                xp,
        "quiz_score":        quiz_score,
        "last_rate":         last_rate,
    }

    # attempt ML recommendation
    try:
        topic_slug = recommend_next_challenge(features)
    except Exception:
        # fallback to first existing module_slug
        topic_slug = (
            Challenge.objects
                     .values_list("module__slug", flat=True)
                     .distinct()
                     .first()
            or ""
        )

    return Response({"recommended_topic": topic_slug})


@api_view(["GET"])
@permission_classes([AllowAny])
def leaderboard(request):
    """
    Return top 10 users by XP.
    """
    top = UserProfile.objects.select_related("user").order_by("-xp")[:10]
    data = [
        {"user": p.user.name, "xp": p.xp, "rank": idx + 1}
        for idx, p in enumerate(top)
    ]
    return Response(data)
