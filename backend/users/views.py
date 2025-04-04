from django.contrib.auth import authenticate, get_user_model
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from courses.models import UserCourse

User = get_user_model()

@api_view(["POST"])
@permission_classes([AllowAny])
def register_user(request):
    name = request.data.get("name")
    email = request.data.get("email")
    password = request.data.get("password")

    if not name or not email or not password:
        return Response({"error": "Missing fields"}, status=400)

    if User.objects.filter(email=email).exists():
        return Response({"error": "Email already registered"}, status=400)

    user = User.objects.create_user(email=email, name=name, password=password)
    token = Token.objects.create(user=user)
    return Response({"token": token.key, "user_id": str(user.id)}, status=201)

@api_view(["POST"])
@permission_classes([AllowAny])
def login_user(request):
    email = request.data.get("email")
    password = request.data.get("password")

    user = authenticate(email=email, password=password)

    if user:
        token, _ = Token.objects.get_or_create(user=user)
        return Response({"token": token.key, "user_id": str(user.id)}, status=200)

    return Response({"error": "Invalid credentials"}, status=401)

from .serializers import UserSerializer

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def user_profile(request):
    user = request.user
    completed = list(user.enrollments.filter(status='completed').values_list('course__title', flat=True))
    enrolled = list(user.enrollments.values_list('course__title', flat=True))
    serialized_user = UserSerializer(user)

    return Response({
        "user": serialized_user.data,
        "completed_courses": completed,
        "enrolled_courses": enrolled
    })


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