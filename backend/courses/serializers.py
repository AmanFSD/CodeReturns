from rest_framework import serializers
from .models import Course, Module, Lesson, UserCourse, Review
from users.models import User

class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = ["id", "title", "video_url", "content", "order_no"]

class ModuleSerializer(serializers.ModelSerializer):
    lessons = LessonSerializer(many=True, read_only=True)

    class Meta:
        model = Module
        fields = ["id", "title", "content", "order_no", "lessons"]

class CourseSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)

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
        ]
        read_only_fields = ["id", "created_at", "enrolled_count", "average_rating", "ratings_count"]

    def create(self, validated_data):
        request = self.context.get('request')
        if request and hasattr(request, 'user'):
            validated_data['created_by'] = request.user
        else:
            raise serializers.ValidationError("User is not authenticated.")
        return super().create(validated_data)
class UserCourseSerializer(serializers.ModelSerializer):
    course = CourseSerializer()
    user = serializers.StringRelatedField()

    class Meta:
        model = UserCourse
        fields = ["id", "user", "course", "progress_percentage", "status", "enrolled_at"]

class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()

    class Meta:
        model = Review
        fields = ["user", "rating", "comment", "created_at"]

class InstructorCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ["id", "title", "description", "created_at", "duration", "enrolled_count", "average_rating"]

class InstructorEnrollmentSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='user.name', read_only=True)
    course_title = serializers.CharField(source='course.title', read_only=True)

    class Meta:
        model = UserCourse
        fields = ["id", "student_name", "course_title", "enrolled_at", "progress_percentage", "status"]

class CourseStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ["id", "title", "enrolled_count", "average_rating", "ratings_count"]