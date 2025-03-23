from django.urls import path
from .views import register_user, login_user,reset_password

urlpatterns = [
    path("register/", register_user, name="register"),
    path("login/", login_user, name="login"),
    path("reset-password/", reset_password, name="reset_password"),  
]