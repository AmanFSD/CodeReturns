# challenges/urls.py
from django.urls import path
from .views import (
    ChallengeList,
    languages_for_company,
    execute_code,
    get_challenge_detail,
    submit_challenge,
    leaderboard,
)

urlpatterns = [
    # List & filters
    path("challenges/", ChallengeList.as_view()),
    path("challenge-languages/", languages_for_company),

    # Detail & actions by slug
    path("challenges/<slug:slug>/", get_challenge_detail),
    path("challenges/<slug:slug>/submit/", submit_challenge),

    # Execute raw code (optional)
    path("execute/", execute_code),

    # Leaderboard
    path("leaderboard/", leaderboard),
]
