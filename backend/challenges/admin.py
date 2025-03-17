from django.contrib import admin
from .models import Challenge, Submission

@admin.register(Challenge)
class ChallengeAdmin(admin.ModelAdmin):
    list_display = ("title", "module", "difficulty", "created_by", "created_at")
    list_filter = ("difficulty", "created_at", "module")
    search_fields = ("title", "description", "module__title")
    ordering = ("created_at",)
    list_editable = ("difficulty",)
    list_per_page = 25

@admin.register(Submission)
class SubmissionAdmin(admin.ModelAdmin):
    list_display = ("user", "challenge", "result", "submitted_at")
    list_filter = ("result", "submitted_at")
    search_fields = ("user__name", "challenge__title", "code")
    ordering = ("submitted_at",)
    list_per_page = 25