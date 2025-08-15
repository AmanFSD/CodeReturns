
from json import load
from django.contrib.auth import authenticate, get_user_model
from rest_framework.authtoken.models import Token
from rest_framework.decorators import (
    api_view,
    permission_classes,
    parser_classes
)
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import UserProfile, UserBadge, Badge
from .serializers import (
    RegisterSerializer,
    UserSerializer,
    ProfilePictureSerializer
)
from courses.models import UserCourse

User = get_user_model()


@api_view(["POST"])
@permission_classes([AllowAny])
def register_user(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        UserProfile.objects.get_or_create(user=user)
        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            "message": "User registered successfully.",
            "token": token.key,
            "user_id": str(user.id),
            "role": user.role
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([AllowAny])
def login_user(request):
    email = request.data.get("email")
    password = request.data.get("password")
    user = authenticate(email=email, password=password)

    if user:
        if not user.is_active:
            return Response({"error": "Your account is pending approval."}, status=403)
        UserProfile.objects.get_or_create(user=user)
        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            "token": token.key,
            "user_id": str(user.id),
            "role": user.role
        }, status=200)

    return Response({"error": "Invalid credentials"}, status=401)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def user_profile(request):
    """
    GET /api/profile/
    Returns:
      {
        user: { id, name, email, role, … },
        profile_picture: "/media/profile_pics/…jpg",
        completed_courses: [...],
        enrolled_courses: [...],
        xp: 123,
        rank: 5,
        badges: [ { title, icon, earned_at }, … ]
      }
    """
    user = request.user

    # Serializer for the user core fields
    serialized_user = UserSerializer(user)

    # Profile and picture URL
    profile = getattr(user, "profile", None)
    profile_picture = (
        profile.profile_picture.url
        if profile and profile.profile_picture
        else None
    )

    # Completed / enrolled lists
    completed = list(
        user.enrollments
            .filter(status="completed")
            .values_list("course__title", flat=True)
    )
    enrolled = list(
        user.enrollments
            .values_list("course__title", flat=True)
    )

    # XP & rank
    xp = profile.xp if profile else 0
    rank = profile.rank if profile else None

    # Badges
    badges = UserBadge.objects.filter(user=user).select_related("badge")
    badge_data = [
        {
            "title": b.badge.title,
            "icon": b.badge.icon.url if b.badge.icon else None,
            "earned_at": b.earned_at,
        }
        for b in badges
    ]

    return Response({
        "user": serialized_user.data,
        "profile_picture": profile_picture,
        "completed_courses": completed,
        "enrolled_courses": enrolled,
        "xp": xp,
        "rank": rank,
        "badges": badge_data,
    })


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def upload_avatar(request):
    """
    POST /api/profile/upload-avatar/
    body: { profile_picture: <file> }
    returns: { profile_picture: "/media/…jpg" }
    """
    profile = request.user.profile
    serializer = ProfilePictureSerializer(
        profile, data=request.data, partial=True
    )

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@api_view(["POST"])
@permission_classes([AllowAny])
def reset_password(request):
    email = request.data.get("email")
    new_password = request.data.get("new_password")

    if not email or not new_password:
        return Response({
            "error": "Email and new password are required."
        }, status=400)

    try:
        user = User.objects.get(email=email)
        user.set_password(new_password)
        user.save()
        return Response({"message": "Password updated successfully!"}, status=200)
    except User.DoesNotExist:
        return Response({"error": "User not found."}, status=404)
    

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def save_quiz(request):
    lang = request.data["language"]  
    answers = request.data["answers"]
    profile = request.user.profile
    profile.quiz_responses[lang] = answers
    profile.save()
    return Response({"status":"ok"})

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def predict_quiz(request):
    lang = request.query_params["language"]
    answers = request.user.profile.quiz_responses.get(lang)
    if not answers:
        return Response({"error":"no quiz data"}, status=400)
    # load your model
    model = load(f"/path/to/quiz_model_{lang}.joblib")
    x = [
      answers["months_experience"],
      answers["loops_confidence"],
      int(answers[f"knows_{lang}"]),
      answers["ds_confidence"],
      answers["debug_confidence"],
    ]
    prob = model.predict_proba([x])[0][1]
    return Response({"pass_probability": round(prob,2)})