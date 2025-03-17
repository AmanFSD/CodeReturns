from django.db import models

import uuid
from users.models import User

INTERVIEW_STATUS_CHOICES = (
    ("scheduled", "Scheduled"),
    ("completed", "Completed"),
    ("canceled", "Canceled"),
)

class MockInterview(models.Model):
    """
    Represents mock interviews taken by users
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="mock_interviews")
    question = models.TextField()
    response = models.TextField()
    feedback = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=INTERVIEW_STATUS_CHOICES, default="scheduled")
    scheduled_time = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Mock Interview for {self.user.name} - {self.status}"