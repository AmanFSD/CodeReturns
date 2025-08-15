# backend/challenges/tests/test_serializers.py
import pytest
from rest_framework import status
from challenges.serializers import ChallengeSerializer
from challenges.models import Language, Company, Challenge
from users.models import User
from courses.models import Course, Module

@pytest.mark.django_db
def test_challenge_serializer_roundtrip():
    # Create dependencies
    user = User.objects.create_user(email='t@e.com', name='T', password='pass')
    lang = Language.objects.create(name="BarLang", slug="barlang")
    comp = Company.objects.create(name="BarCo", slug="barco")
    course = Course.objects.create(title="Test Course", description="Desc", created_by=user)
    module = Module.objects.create(title="Sec", content="", course=course, order_no=1)

    payload = {
        "title": "Test Challenge",
        "description": "This is a test.",
        "difficulty": "medium",
        "language_id": lang.id,
        "company_id": comp.id,
        "module": module.id,
    }
    serializer = ChallengeSerializer(data=payload)
    assert serializer.is_valid(), f"Unexpected errors: {serializer.errors}"
    challenge = serializer.save(created_by=user)

    # Check FKs set properly
    assert challenge.language == lang
    assert challenge.company == comp
    assert challenge.module == module
    # Check slug auto-generated
    assert challenge.slug == "test-challenge"
    # Check defaults
    assert challenge.xp_reward == 10
    assert challenge.expected_output == ""
