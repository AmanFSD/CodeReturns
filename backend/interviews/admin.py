from django.contrib import admin
from .models import MockInterview

@admin.register(MockInterview)
class MockInterviewAdmin(admin.ModelAdmin):
    list_display = ("user", "question", "status", "created_at", "scheduled_time")
    list_filter = ("status", "created_at", "scheduled_time")
    search_fields = ("user__name", "question", "response", "feedback")
    ordering = ("created_at",)
    list_editable = ("status",)
    list_per_page = 25