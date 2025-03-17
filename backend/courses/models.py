import uuid
from django.db import models

from users.models import User



def course_image_path(instance, filename):
    """Generate file path for new course image upload."""
    return f'courses/{instance.id}/{filename}'

class Course(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False)
    title = models.CharField(max_length=255)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to=course_image_path, null=True, blank=True)

    def __str__(self):
        return self.title


class Module(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="modules")
    title = models.CharField(max_length=255)
    content = models.TextField()
    order_no = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.title} (Course: {self.course.title})"


class UserCourse(models.Model):
    STATUS_CHOICES = (
        ("in-progress", "In Progress"),
        ("completed", "Completed"),
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="enrollments")
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="user_courses")
    enrolled_at = models.DateTimeField(auto_now_add=True)
    progress_percentage = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="in-progress")

    def __str__(self):
        return f"{self.user.name} -> {self.course.title} ({self.status})"