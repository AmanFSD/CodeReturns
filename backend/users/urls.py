from django.urls import path
from .views import register_user, login_user,reset_password, user_profile

urlpatterns = [
    path("register/", register_user, name="register"),
    path("login/", login_user, name="login"),
    path("profile/", user_profile, name="user_profile"), 
    path("reset-password/", reset_password, name="reset_password"),  
]