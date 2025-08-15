# backend/users/urls.py

from django.urls import path
from .views import (
    predict_quiz,
    register_user,
    login_user,
    reset_password,
    save_quiz,
    user_profile,
    upload_avatar,
)

urlpatterns = [
    path("register/", register_user, name="register"),
    path("login/", login_user, name="login"),
    path("profile/", user_profile, name="user_profile"),
    path("profile/upload-avatar/", upload_avatar, name="upload_avatar"),
    path("reset-password/", reset_password, name="reset_password"),
    path("profile/quiz/", save_quiz, name="save-quiz"),
    path("profile/quiz/predict/", predict_quiz, name="predict-quiz"),
 
]