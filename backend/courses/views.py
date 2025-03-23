from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Course, UserCourse
from .serializers import CourseSerializer, UserCourseSerializer



@api_view(["GET"])
def get_courses(request):
    """Fetch all courses."""
    courses = Course.objects.all()
    serializer = CourseSerializer(courses, many=True)
    return Response(serializer.data)
@api_view(["GET"])
def get_course_detail(request, course_id):
    """Fetch a specific course along with its modules."""
    try:
        course = Course.objects.get(id=course_id)
        serializer = CourseSerializer(course)
        return Response(serializer.data)
    except Course.DoesNotExist:
        return Response({"error": "Course not found"}, status=404)

@api_view(["GET"])
def get_user_reviews(request, course_id):
    """Fetch user reviews for a specific course."""
    user_courses = UserCourse.objects.filter(course__id=course_id)
    serializer = UserCourseSerializer(user_courses, many=True)
    return Response(serializer.data)