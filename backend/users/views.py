from django.contrib.auth import authenticate, get_user_model
from users.models import CustomToken as Token,User

from rest_framework import status


User = get_user_model()




# backend/users/views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from courses.models import UserCourse
from courses.serializers import UserCourseSerializer

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def user_profile(request):
    """Returns the profile data of the authenticated user."""
    user = request.user

    # Get enrolled and completed course titles
    enrolled_courses = UserCourse.objects.filter(user=user)
    completed_titles = [uc.course.title for uc in enrolled_courses if uc.status == "completed"]
    enrolled_titles = [uc.course.title for uc in enrolled_courses]

    data = {
        "user": {
            "name": user.name,
            "email": user.email,
        },
        "completed_courses": completed_titles,
        "enrolled_courses": enrolled_titles,
    }

    return Response(data, status=status.HTTP_200_OK)

@api_view(["POST"])
def register_user(request):
    """Handles user registration"""
    try:
        # Directly access data from request.data (parsed by DRF)
        name = request.data.get("name")
        email = request.data.get("email")
        password = request.data.get("password")

        if not name or not email or not password:
            return Response({"error": "Missing required fields"}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return Response({"error": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(email=email, name=name, password=password)
        token, _ = Token.objects.get_or_create(user=user)

        return Response({"token": token.key, "user_id": str(user.id)}, status=status.HTTP_201_CREATED)

    except Exception as e:
        import traceback
        traceback.print_exc()
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(["POST"])
def login_user(request):
    """Handles user login"""
    email = request.data.get("email")
    password = request.data.get("password")

    user = authenticate(email=email, password=password)

    if user:
        token, _ = Token.objects.get_or_create(user=user)
        return Response({"token": token.key, "user_id": str(user.id)}, status=status.HTTP_200_OK)

    return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(["POST"])
def reset_password(request):
    """Reset password for a user using email and new password"""
    email = request.data.get("email")
    new_password = request.data.get("new_password")

    if not email or not new_password:
        return Response({"error": "Email and new password are required."}, status=400)

    try:
        user = User.objects.get(email=email)
        user.set_password(new_password)
        user.save()
        return Response({"message": "Password updated successfully!"}, status=200)
    except User.DoesNotExist:
        return Response({"error": "User not found."}, status=404)