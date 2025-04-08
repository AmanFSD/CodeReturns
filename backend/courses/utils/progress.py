# courses/utils/progress.py
from courses.models import Lesson, LessonCompletion, UserCourse
from challenges.models import Challenge, Submission

def update_course_progress(user, course):
    total_lessons = Lesson.objects.filter(module__course=course).count()
    completed_lessons = LessonCompletion.objects.filter(user=user, lesson__module__course=course).count()

    total_challenges = Challenge.objects.filter(module__course=course).count()
    passed_challenges = Submission.objects.filter(user=user, challenge__module__course=course, passed=True).count()

    total = total_lessons + total_challenges
    completed = completed_lessons + passed_challenges

    percentage = (completed / total) * 100 if total else 0

    user_course = UserCourse.objects.get(user=user, course=course)
    user_course.progress_percentage = percentage
    user_course.status = "completed" if percentage >= 100 else "in-progress"
    user_course.save()