from django.urls import path

from .views import (
    InstructorEnrollmentsView,
    InstructorStatsView,
    MyCoursesView,
    UploadCourseView,
    create_course,
    get_courses,
    get_course_detail,
    get_user_reviews,
    get_enrolled_courses,
    EnrollInCourseView,
    submit_review,
)

urlpatterns = [
    path("", get_courses, name="get_courses"), 
    path("<uuid:course_id>/", get_course_detail, name="get_course_detail"),
    path("<uuid:course_id>/reviews/", get_user_reviews, name="get_user_reviews"),
    path("<uuid:course_id>/submit-review/", submit_review, name="submit_review"),
    path("<uuid:course_id>/enroll/", EnrollInCourseView.as_view(), name="enroll_course"),
    path("enrolled-courses/", get_enrolled_courses, name="get_enrolled_courses"),
    path("create/", create_course, name="create_course"),
     path("instructor/my-courses/", MyCoursesView.as_view(), name="my-courses"),
    path("instructor/upload-course/", UploadCourseView.as_view(), name="upload-course"),
    path("instructor/enrollments/", InstructorEnrollmentsView.as_view(), name="instructor-enrollments"),
    path("instructor/stats/", InstructorStatsView.as_view(), name="instructor-stats"),

]