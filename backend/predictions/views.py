# backend/predictions/views.py
import os
import pandas as pd
from django.conf import settings
from django.shortcuts import get_list_or_404
from .ml.utils_recommend import recommend_next_challenge
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from users.models import UserProfile
from challenges.models import Challenge
from challenges.serializers import ChallengeSerializer
from .ml.utils          import _ensure_model_loaded, predict_success
from .ml.utils_time     import predict_time_to_complete

QUESTION_BANK = {
    "python": [ ... ],         # keep your five questions here
    "javascript": [ ... ],
    "java": [ ... ],
}

# ─── Quiz Questions ─────────────────────────────────────────────────────────
@api_view(["GET"])
@permission_classes([AllowAny])
def get_quiz_questions(request):
    lang = request.query_params.get("language", "").lower()
    if lang not in QUESTION_BANK:
        return Response({"detail": "Unsupported language"}, status=400)
    return Response(QUESTION_BANK[lang])

# ─── Quiz Predict ────────────────────────────────────────────────────────────
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def quiz_predict(request):
    """
    Expects POST body: months_experience, loops_confidence,
                       knows_python, ds_confidence, debug_confidence,
                       language
    Uses profile.xp and profile.quiz_responses to compute final probability.
    """
    profile = request.user.profile

    # 1) Compute quiz_score from JSON responses
    raw = profile.quiz_responses or {}
    scores = []
    for val in raw.values():
        if isinstance(val, (int, float)):
            scores.append(val)
        elif isinstance(val, dict):
            s = val.get("score")
            if isinstance(s, (int, float)):
                scores.append(s)
            elif "correct" in val:
                scores.append(1 if val["correct"] else 0)
    quiz_score = sum(scores) / len(scores) if scores else 0.0

    # 2) Extract & coerce inputs from request.data
    data = request.data
    try:
        features = {
            "months_experience": int(data["months_experience"]),
            "loops_confidence":  int(data["loops_confidence"]),
            "knows_python":      int(data["knows_python"]),
            "ds_confidence":     int(data["ds_confidence"]),
            "debug_confidence":  int(data["debug_confidence"]),
            "xp":                profile.xp,
            "quiz_score":        quiz_score,
        }
    except (KeyError, ValueError, TypeError):
        return Response({"error": "Invalid or missing feature field"}, status=400)

    prob = predict_success(features)
    return Response({"probability": prob})

# ─── Predict Time ───────────────────────────────────────────────────────────
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def predict_time(request):
    data = request.data
    try:
        features = {
            "months_experience": int(data["months_experience"]),
            "loops_confidence":  int(data["loops_confidence"]),
            "knows_python":      int(data["knows_python"]),
            "ds_confidence":     int(data["ds_confidence"]),
            "debug_confidence":  int(data["debug_confidence"]),
            "xp":                int(data["xp"]),
            "quiz_score":        float(data["quiz_score"]),
            "difficulty":        int(data["difficulty"]),
        }
    except (KeyError, ValueError, TypeError):
        return Response({"error": "Invalid or missing field"}, status=400)

    minutes = predict_time_to_complete(features)
    return Response({"estimated_time_minutes": round(minutes, 2)})

# ─── Recommend Challenge ────────────────────────────────────────────────────
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def recommend_challenge(request):
    profile = request.user.profile

    # compute quiz_score as above
    raw = profile.quiz_responses or {}
    scores = []
    for answers in raw.values():
        if isinstance(answers, (int, float)):
            scores.append(answers)
        elif isinstance(answers, dict):
            s = answers.get("score")
            if isinstance(s, (int, float)):
                scores.append(s)
            elif "correct" in answers:
                scores.append(1 if answers["correct"] else 0)
    quiz_score = sum(scores) / len(scores) if scores else 0.0

    # build features for recommender
    features = {
        "months_experience": int(request.query_params.get("months_experience", 0)),
        "xp":                profile.xp,
        "quiz_score":        quiz_score,
        "last_rate":         float(request.query_params.get("last_rate", 0.5)),
        "current_topic":     int(request.query_params.get("current_topic", 1)),
    }

    rec_slug = recommend_next_challenge(features)

    return Response({"recommended_topic_slug": rec_slug})
