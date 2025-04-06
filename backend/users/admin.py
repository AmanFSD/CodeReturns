from django.contrib import admin
from django.contrib.auth.models import Group
from .models import User


from django.contrib import admin
from django.utils.translation import gettext_lazy as _

admin.site.site_header = "KazCode"  # Header displayed on the login page and at the top of the admin panel
admin.site.site_title = "Aman"  # Browser title
admin.site.index_title = "Welcome to KazCode Admin Panel"  # Dashboard title
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "role", "is_active")
    list_filter = ("role", "is_active")
    search_fields = ("name", "email")
    ordering = ("name",)
    list_editable = ("is_active",)
    list_per_page = 25

    fieldsets = (
        ("Basic Info", {
            "fields": ("name", "email", "role", "is_active"),
        }),
        ("Advanced Options", {
            "fields": (),
            "classes": ("collapse",),
        }),
    )

    
from .models import User, UserProfile

class UserProfileInline(admin.StackedInline):
    model = UserProfile
    can_delete = False
    verbose_name_plural = 'User Profile'

admin.site.register(UserProfile)
# @admin.register(UserProfile)
# class UserProfileAdmin(admin.ModelAdmin):
#     list_display = ("user", "phone_number", "linkedin_url")
#     search_fields = ("user__name", "phone_number", "linkedin_url")
#     ordering = ("user__name",)
#     list_per_page = 25

# Unregister Group model from admin (not needed if using custom User model)
admin.site.unregister(Group)