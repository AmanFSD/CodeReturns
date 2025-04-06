from .models import Course, Review, UserCourse
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

class EnrollInCourseView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, course_id=None):
        user = request.user
        if not course_id:
            course_id = request.data.get("course_id")

        if not course_id:
            return Response({"error": "Course ID is missing."}, status=400)

        if UserCourse.objects.filter(user=user, course_id=course_id).exists():
            return Response({"message": "Already enrolled."}, status=200)

        UserCourse.objects.create(user=user, course_id=course_id)

        Course.objects.filter(id=course_id).update(enrolled_count=F('enrolled_count') + 1)

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


# courses/views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Course, Review
from users.models import User

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

    # Optional: prevent duplicate review
    if Review.objects.filter(user=user, course=course).exists():
        return Response({"error": "You already reviewed this course."}, status=400)

    Review.objects.create(
        user=user,
        course=course,
        rating=rating,
        comment=comment or ""
    )

    # Optional: update course average rating
    reviews = Review.objects.filter(course=course)
    avg_rating = sum([float(r.rating) for r in reviews]) / len(reviews)
    course.average_rating = round(avg_rating, 2)
    course.ratings_count = reviews.count()
    course.save()

    return Response({"message": "Review submitted successfully!"}, status=201)