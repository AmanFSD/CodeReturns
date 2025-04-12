from django.urls import path
from .views import execute_code, get_challenge_detail

urlpatterns = [
    path("execute/", execute_code),
    path("api/challenges/<uuid:challenge_id>/", get_challenge_detail),

]