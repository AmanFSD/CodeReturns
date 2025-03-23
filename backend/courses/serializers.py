from rest_framework import serializers
from .models import Course, Module, UserCourse
from users.models import User  # Assuming the User model exists

class ModuleSerializer(serializers.ModelSerializer):
    """Serializes course modules (sections & lessons)."""

    class Meta:
        model = Module
        fields = ["id", "title", "content", "order_no"]

class CourseSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)

    class Meta:
        model = Course
        fields = ['id', 'title', 'description', 'created_at', 'created_by', 'image']

class UserCourseSerializer(serializers.ModelSerializer):
    """Serializes user enrollment and progress."""
    
    course = CourseSerializer()

    class Meta:
        model = UserCourse
        fields = ["id", "user", "course", "progress_percentage", "status", "enrolled_at"]

class ReviewSerializer(serializers.ModelSerializer):
    """Serializes user reviews (Assuming review model exists)."""

    user = serializers.StringRelatedField()  # To show the reviewer's name

    class Meta:
        model = UserCourse  # Replace with Review model if available
        fields = ["user", "progress_percentage", "status", "enrolled_at"]