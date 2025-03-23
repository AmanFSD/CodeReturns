from django.urls import path
from .views import get_course_detail, get_courses, get_user_reviews

urlpatterns = [
    path("", get_courses, name="get_courses"),
    path("courses/<uuid:course_id>/", get_course_detail, name="get_course_detail"),
    path("courses/<uuid:course_id>/reviews/", get_user_reviews, name="get_user_reviews"),
]