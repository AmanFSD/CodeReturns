from rest_framework import serializers
from .models import Course

class CourseSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)

    class Meta:
        model = Course
        fields = ['id', 'title', 'description', 'created_at', 'created_by', 'image']