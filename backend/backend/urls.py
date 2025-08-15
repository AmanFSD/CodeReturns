"""
URL configuration for backend project.
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),

    # Courses endpoints
    path("api/courses/", include("courses.urls")),
    path("api/predictions/", include("predictions.urls")),
    # Challenges endpoints
    path("api/", include("challenges.urls")),

    # Predictions endpoints (quiz-predict, predict_time, recommend_challenge, etc)


    # User/profile endpoints (login, signup, profile, etc)
    # these live under /api/… so must come last, after the narrower routes above
    path("api/", include("users.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
