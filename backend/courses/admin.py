from django.contrib import admin
from .models import Course, Module, UserCourse

class ModuleInline(admin.TabularInline):
    model = Module
    extra = 1
    fields = ("title", "order_no")
    readonly_fields = ("order_no",)

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ("title", "created_by", "created_at")
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
    list_per_page = 25

@admin.register(UserCourse)
class UserCourseAdmin(admin.ModelAdmin):
    list_display = ("user", "course", "status", "progress_percentage", "enrolled_at")
    list_filter = ("status", "enrolled_at")
    search_fields = ("user__name", "course__title")
    ordering = ("enrolled_at",)
    list_editable = ("status", "progress_percentage")
    list_per_page = 25