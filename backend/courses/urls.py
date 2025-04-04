from django.urls import path
from .views import (
    get_courses,
    get_course_detail,
    get_user_reviews,
    get_enrolled_courses,
    EnrollInCourseView,
)

urlpatterns = [
    path("", get_courses, name="get_courses"), 
    path("<uuid:course_id>/", get_course_detail, name="get_course_detail"),
    path("<uuid:course_id>/reviews/", get_user_reviews, name="get_user_reviews"),
    path("<uuid:course_id>/enroll/", EnrollInCourseView.as_view(), name="enroll_course"),
    path("enrolled-courses/", get_enrolled_courses, name="get_enrolled_courses"),
]