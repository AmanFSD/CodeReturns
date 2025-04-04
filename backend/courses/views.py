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
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from .models import UserCourse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework import status
from .models import UserCourse

class EnrollInCourseView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, course_id):
        user = request.user
        if UserCourse.objects.filter(user=user, course_id=course_id).exists():
            return Response({"message": "Already enrolled."}, status=200)
        UserCourse.objects.create(user=user, course_id=course_id)
        return Response({"message": "Enrolled successfully."}, status=201)
    

@api_view(["GET"])
@permission_classes([AllowAny])
def get_courses(request):
    courses = Course.objects.all()

    enrolled_course_ids = []

    if request.user.is_authenticated:
        enrolled_course_ids = UserCourse.objects.filter(user=request.user).values_list("course_id", flat=True)

    serializer = CourseSerializer(courses, many=True)

    return Response({
        "courses": serializer.data,
        "enrolled_ids": enrolled_course_ids,
    })


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