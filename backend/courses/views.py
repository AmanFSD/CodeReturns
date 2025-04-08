from courses.utils.progress import update_course_progress 
from .models import Course, Lesson, LessonCompletion, Review, UserCourse
from .serializers import CourseSerializer, ReviewSerializer, UserCourseSerializer

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
from .models import Course, Review
from users.models import User
from django.db.models import Sum


class EnrollInCourseView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, course_id):
        try:
            course = Course.objects.get(id=course_id)
            user = request.user

            # Check if already enrolled
            if UserCourse.objects.filter(user=user, course=course).exists():
                return Response({"message": "Already enrolled"}, status=status.HTTP_200_OK)

            # Create UserCourse
            UserCourse.objects.create(user=user, course=course)

            course.enrolled_count = UserCourse.objects.filter(course=course).count()
            course.save()

            return Response({"message": "Successfully enrolled"}, status=status.HTTP_201_CREATED)

        except Course.DoesNotExist:
            return Response({"error": "Course not found"}, status=status.HTTP_404_NOT_FOUND)
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
@permission_classes([AllowAny])
def get_user_reviews(request, course_id):
    """Fetch user reviews for a specific course."""
    reviews = Review.objects.filter(course_id=course_id)
    serializer = ReviewSerializer(reviews, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_enrolled_courses(request):
    enrollments = UserCourse.objects.filter(user=request.user)
    data = [{"id": uc.course.id} for uc in enrollments]
    return Response(data)





@api_view(["POST"])
@permission_classes([IsAuthenticated])
def submit_review(request, course_id):
    """Submit a review for a course."""
    user = request.user
    rating = request.data.get("rating")
    comment = request.data.get("comment")

    if not rating:
        return Response({"error": "Rating is required."}, status=400)

    try:
        course = Course.objects.get(id=course_id)
    except Course.DoesNotExist:
        return Response({"error": "Course not found."}, status=404)

    if Review.objects.filter(user=user, course=course).exists():
        return Response({"error": "You already reviewed this course."}, status=400)

    Review.objects.create(
        user=user,
        course=course,
        rating=rating,
        comment=comment or ""
    )

    reviews = Review.objects.filter(course=course)
    avg_rating = sum([float(r.rating) for r in reviews]) / len(reviews)
    course.average_rating = round(avg_rating, 2)
    course.ratings_count = reviews.count()
    course.save()

    return Response({"message": "Review submitted successfully!"}, status=201)




from .serializers import CourseSerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_course(request):
    data = request.data.copy()
    data['created_by'] = request.user.id

    serializer = CourseSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




@api_view(["POST"])
@permission_classes([IsAuthenticated])
def mark_lesson_complete(request, lesson_id):
    try:
        lesson = Lesson.objects.get(id=lesson_id)
        LessonCompletion.objects.get_or_create(user=request.user, lesson=lesson, completed=True)
        
        update_course_progress(request.user, lesson.module.course)

        return Response({"message": "Lesson marked as completed."})
    except Lesson.DoesNotExist:
        return Response({"error": "Lesson not found."}, status=404)
    


from rest_framework import generics, permissions
from .models import Course, UserCourse
from .serializers import (
    InstructorCourseSerializer, 
    InstructorEnrollmentSerializer, 
    CourseStatsSerializer, 
    CourseSerializer
)

# Custom permission for instructors
class IsInstructor(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'mentor'

# Instructor My Courses
class MyCoursesView(generics.ListAPIView):
    serializer_class = InstructorCourseSerializer
    permission_classes = [IsInstructor]

    def get_queryset(self):
        return Course.objects.filter(created_by=self.request.user)

# Instructor Upload Course
class UploadCourseView(generics.CreateAPIView):
    serializer_class = CourseSerializer
    permission_classes = [IsInstructor]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

# Instructor Enrollments
class InstructorEnrollmentsView(generics.ListAPIView):
    serializer_class = InstructorEnrollmentSerializer
    permission_classes = [IsInstructor]

    def get_queryset(self):
        return UserCourse.objects.filter(course__created_by=self.request.user).order_by("-enrolled_at")

# Instructor Stats

class InstructorStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        instructor_courses = Course.objects.filter(created_by=request.user)
        total_courses = instructor_courses.count()
        total_students = instructor_courses.aggregate(
            total_students=Sum('enrolled_count')
        )['total_students'] or 0
        
        return Response({
            'total_courses': total_courses,
            'total_students': total_students,
        })