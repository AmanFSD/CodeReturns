from .models import Course, UserCourse
from .serializers import CourseSerializer, UserCourseSerializer

from rest_framework.response import Response
from rest_framework import status
from .models import Course, UserCourse
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

@csrf_exempt
@api_view(["POST"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def enroll_in_course(request, course_id):
    user = request.user
    try:
        # Avoid duplicate enrollments
        if UserCourse.objects.filter(user=user, course_id=course_id).exists():
            return Response({"message": "Already enrolled."}, status=200)

        UserCourse.objects.create(user=user, course_id=course_id)
        return Response({"message": "Enrolled successfully."}, status=201)
    except Exception as e:
        return Response({"error": str(e)}, status=400)

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


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_enrolled_courses(request):
    enrollments = UserCourse.objects.filter(user=request.user)
    data = [{"id": uc.course.id} for uc in enrollments]
    return Response(data)