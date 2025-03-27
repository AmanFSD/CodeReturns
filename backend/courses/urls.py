from django.urls import path
from .views import (
    get_courses,
    get_course_detail,
    get_user_reviews,
    enroll_in_course,
    get_enrolled_courses,
)

urlpatterns = [
    # Public course routes
    path("", get_courses, name="get_courses"),  # ✅ Lists all courses (public)
    path("courses/<uuid:course_id>/", get_course_detail, name="get_course_detail"),
    path("courses/<uuid:course_id>/reviews/", get_user_reviews, name="get_user_reviews"),

    # Authenticated routes
    path("courses/<uuid:course_id>/enroll/", enroll_in_course, name="enroll_course"),
    path("enrolled-courses/", get_enrolled_courses, name="get_enrolled_courses"),
]