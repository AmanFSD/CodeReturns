# users/serializers.py

from rest_framework import serializers
from .models import UserProfile, User

class UserProfileSerializer(serializers.ModelSerializer):
    profile_picture = serializers.ImageField(use_url=True)

    class Meta:
        model = UserProfile
        fields = ['bio', 'profile_picture', 'location', 'phone']

class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer()

    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'profile']