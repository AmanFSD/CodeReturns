**CODE RETURNS – Full-Stack Coding Practice Platform

Code Returns is a full-stack web app for practicing programming challenges with progress tracking, gamification, and ML-powered guidance. The stack pairs a React + TypeScript (Vite) frontend with a Django REST Framework backend and PostgreSQL. It ships with modular Django apps, role-based access, and production-ready APIs.

Key Features

Gamified Learning

XP system, badges, global leaderboard

Personalized next-challenge recommendations

Roles & Permissions

Student / Instructor separation

DRF permissions for secure, dynamic content visibility

Courses & Lessons

Udemy-style course hierarchy (Course → Modules → Lessons)

Instructor uploads, embedded video playback, in-lesson quizzes

Challenges & Submissions

Interactive code challenge editor (Material UI v5)

Test case execution, solve-time predictions, submission feedback

Dashboards

Student progress tracking & recommended items

Instructor analytics: enrollments, submissions, course stats

Clean Backend Domains

Reusable Django apps: users, challenges, courses, predictions, subscriptions, etc.


Tech Stack

Frontend

React + TypeScript (.tsx)

Vite (dev server & build)

Material UI v5

Axios / React Query (or equivalent) for API calls (configurable)

Backend

Python, Django, Django REST Framework

PostgreSQL

scikit-learn (ML)

JWT/Token auth (DRF auth; pluggable)

Celery/Redis (optional) for async jobs

Architecture

API-First: DRF exposes versioned REST endpoints (/api/v1/...).

Modular Apps: Clear domain boundaries; each app owns models, serializers, views, permissions.

Front-Back Sync: Typed models & DTOs, predictable response envelopes, client-side caching.

Security: Role-based routing on the frontend, DRF permissions & throttling on the backend.


ML Pipelines

Three production-integrated pipelines (served via /api/v1/predictions/...):

Quiz Success Prediction — SGDClassifier

Solve-Time Estimation — RandomForestRegressor

Next-Topic Recommendation — RandomForestClassifier

Pipelines are trained offline, persisted (e.g., joblib), and loaded by the predictions app. Each model is wrapped by a small, versioned inference endpoint.



# From project root
cd backend
python -m venv .venv && source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt

# Create DB (PostgreSQL running locally)
# Ensure .env is configured (see below), then:
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver 0.0.0.0:8000


# From project root
cd backend
python -m venv .venv && source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt

# Create DB (PostgreSQL running locally)
# Ensure .env is configured (see below), then:
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver 0.0.0.0:8000
