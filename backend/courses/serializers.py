from rest_framework import serializers
from .models import Course, Module, Lesson, UserCourse, Review
from users.models import User


class LessonSerializer(serializers.ModelSerializer):
    """Serializes lessons inside a module."""

    class Meta:
        model = Lesson
        fields = ["id", "title", "video_url", "content", "order_no"]


class ModuleSerializer(serializers.ModelSerializer):
    """Serializes course modules (sections & their lessons)."""
    lessons = LessonSerializer(many=True, read_only=True)

    class Meta:
        model = Module
        fields = ["id", "title", "content", "order_no", "lessons"]


class CourseSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)
    modules = ModuleSerializer(many=True, read_only=True)

    class Meta:
        model = Course
        fields = [
            "id",
            "title",
            "description",
            "created_at",
            "created_by",
            "image",
            "duration",
            "enrolled_count",
            "average_rating",
            "ratings_count",
            "modules",
        ]


class UserCourseSerializer(serializers.ModelSerializer):
    """Serializes user enrollment and progress."""
    course = CourseSerializer()

    class Meta:
        model = UserCourse
        fields = ["id", "user", "course", "progress_percentage", "status", "enrolled_at"]


class ReviewSerializer(serializers.ModelSerializer):
    """Serializes user reviews."""
    user = serializers.StringRelatedField()

    class Meta:
        model = Review
        fields = ["user", "rating", "comment", "created_at"]