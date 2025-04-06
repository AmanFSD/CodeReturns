from django.contrib import admin
from .models import Course, Module, UserCourse, Lesson, Review


class LessonInline(admin.TabularInline):
    model = Lesson
    extra = 1
    fields = ("title", "order_no", "video_url")
    ordering = ("order_no",)


class ModuleInline(admin.TabularInline):
    model = Module
    extra = 1
    fields = ("title", "order_no")
    ordering = ("order_no",)


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ("title", "created_by", "created_at", "duration", "enrolled_count", "average_rating", "ratings_count")
    list_filter = ("created_by", "created_at")
    search_fields = ("title", "description")
    ordering = ("created_at",)
    inlines = [ModuleInline]
    list_per_page = 25


@admin.register(Module)
class ModuleAdmin(admin.ModelAdmin):
    list_display = ("title", "course", "order_no")
    list_filter = ("course",)
    search_fields = ("title", "content")
    ordering = ("course", "order_no")
    inlines = [LessonInline]
    list_per_page = 25


@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    list_display = ("title", "module", "order_no", "video_url")
    list_filter = ("module",)
    search_fields = ("title", "content")
    ordering = ("module", "order_no")


@admin.register(UserCourse)
class UserCourseAdmin(admin.ModelAdmin):
    list_display = ("user", "course", "status", "progress_percentage", "enrolled_at")
    list_filter = ("status", "enrolled_at")
    search_fields = ("user__name", "course__title")
    ordering = ("enrolled_at",)
    list_editable = ("status", "progress_percentage")
    list_per_page = 25


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ("user", "course", "rating", "created_at")
    list_filter = ("rating", "created_at")
    search_fields = ("user__name", "course__title", "comment")
    ordering = ("-created_at",)
    list_per_page = 25