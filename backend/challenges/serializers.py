# backend/challenges/serializers.py

from rest_framework import serializers
from .models import Challenge, Company, Language

class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Language
        fields = ["id", "name", "slug"]

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model  = Company
        fields = ["id", "name", "slug", "logo"]

class ChallengeSerializer(serializers.ModelSerializer):
    # nested read-only serializers
    language   = LanguageSerializer(read_only=True)
    company    = CompanySerializer(read_only=True)

    # directly expose model fields; no `source=` needed when name matches
    topic      = serializers.CharField(read_only=True)
    topic_slug = serializers.CharField(read_only=True)

    class Meta:
        model = Challenge
        fields = [
            "id",
            "topic",        # human-readable topic
            "topic_slug",   # module slug
            "language",
            "language_id",
            "company",
            "company_id",
            "title",
            "slug",
            "description",
            "difficulty",
            "xp_reward",
            "created_at",
        ]
        read_only_fields = (
            "id", "slug", "created_at",
            "topic", "topic_slug",
        )

class LeaderboardSerializer(serializers.Serializer):
    user = serializers.CharField()
    xp   = serializers.IntegerField()
