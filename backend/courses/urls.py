from django.urls import path
from .views import enroll_in_course, get_course_detail, get_courses, get_enrolled_courses, get_user_reviews

urlpatterns = [
    path("", get_courses, name="get_courses"),
    path("courses/<uuid:course_id>/", get_course_detail, name="get_course_detail"),
    path("courses/<uuid:course_id>/reviews/", get_user_reviews, name="get_user_reviews"),
    path("courses/<uuid:course_id>/enroll/", enroll_in_course, name="enroll_course"),
    path("enrolled-courses/", get_enrolled_courses, name="get_enrolled_courses"),

]