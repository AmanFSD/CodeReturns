import uuid
from django.db import models
from django.utils.text import slugify 
from users.models import User
from courses.models import Module


class Language(models.Model):
    """
    Examples: Python, JavaScript, Java …
    """
    id   = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(max_length=50, unique=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Company(models.Model):
    """
    Examples: Meta (Facebook), Netflix, Google, Apple …
    """
    id   = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True, blank=True)

    logo = models.ImageField(upload_to="company_logos/", blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name




DIFFICULTY_CHOICES = (
    ("easy",   "Easy"),
    ("medium", "Medium"),
    ("hard",   "Hard"),
)



TOPIC_CHOICES = (
    ("loops",           "Loops"),
    ("data_structures", "Data Structures"),
    ("debugging",       "Debugging"),
)
# ────────────────────────────────────────────────────────────────────────────────

class Challenge(models.Model):
    id          = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    module      = models.ForeignKey(Module, on_delete=models.CASCADE, related_name="challenges")
    language    = models.ForeignKey("Language", on_delete=models.PROTECT, related_name="challenges", blank=True, null=True)
    company     = models.ForeignKey("Company",  on_delete=models.PROTECT, related_name="challenges", blank=True, null=True)
    title       = models.CharField(max_length=255)
    slug        = models.SlugField(unique=True, blank=True, null=True)
    description = models.TextField()
    difficulty  = models.CharField(max_length=10, choices=DIFFICULTY_CHOICES, default="easy")

    # ─── NEW: topic field ──────────────────────────────────────────────────────
    topic       = models.CharField(
        max_length=20,
        choices=TOPIC_CHOICES,
        default="loops",
        help_text="What topic this challenge practices."
    )
    # ─────────────────────────────────────────────────────────────────────────────

    expected_output = models.TextField(default="", help_text="Exact stdout for a correct solution")
    xp_reward      = models.PositiveIntegerField(default=10)
    created_by     = models.ForeignKey(User, on_delete=models.CASCADE, related_name="created_challenges")
    created_at     = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.title} [{self.topic}]"


class Submission(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="submissions")
    challenge = models.ForeignKey(Challenge, on_delete=models.CASCADE, related_name="submissions")
    code = models.TextField()
    result = models.CharField(max_length=50)
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Submission by {self.user.name} for {self.challenge.title}"