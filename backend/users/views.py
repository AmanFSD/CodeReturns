# users/views.py

from django.contrib.auth import authenticate, get_user_model
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import UserProfile, UserBadge, Badge
from .serializers import RegisterSerializer, UserSerializer
from courses.models import UserCourse

User = get_user_model()

@api_view(["POST"])
@permission_classes([AllowAny])
def register_user(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()

        # Create associated profile
        UserProfile.objects.get_or_create(user=user)

        # Create token
        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            "message": "User registered successfully.",
            "token": token.key,
            "user_id": str(user.id),
            "role": user.role
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
@permission_classes([AllowAny])
def login_user(request):
    email = request.data.get("email")
    password = request.data.get("password")

    user = authenticate(email=email, password=password)

    if user:
        if not user.is_active:
            return Response({"error": "Your account is pending approval."}, status=403)

        # Ensure profile exists (failsafe)
        UserProfile.objects.get_or_create(user=user)

        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            "token": token.key,
            "user_id": str(user.id),
            "role": user.role
        }, status=200)

    return Response({"error": "Invalid credentials"}, status=401)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def user_profile(request):
    user = request.user
    completed = list(user.enrollments.filter(status='completed').values_list('course__title', flat=True))
    enrolled = list(user.enrollments.values_list('course__title', flat=True))

    serialized_user = UserSerializer(user)

    # XP and Badges
    profile = getattr(user, 'profile', None)
    xp = profile.xp if profile else 0
    badges = UserBadge.objects.filter(user=user).select_related('badge')

    badge_data = [{
        "title": b.badge.title,
        "icon": b.badge.icon.url if b.badge.icon else None,
        "earned_at": b.earned_at
    } for b in badges]

    return Response({
        "user": serialized_user.data,
        "completed_courses": completed,
        "enrolled_courses": enrolled,
        "xp": xp,
        "badges": badge_data
    })

@api_view(["POST"])
@permission_classes([AllowAny])
def reset_password(request):
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
    


