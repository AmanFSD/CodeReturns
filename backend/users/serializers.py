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
        fields = ['id', 'name', 'email', 'role', 'profile'] 


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['name', 'email', 'password', 'role']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            name=validated_data['name'],
            password=validated_data['password'],
            role=validated_data.get('role', 'student') 
        )
        UserProfile.objects.create(user=user)  
        return user