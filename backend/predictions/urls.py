from django.urls import path
from .views import (
    get_quiz_questions,
    quiz_predict,
    predict_time,
    recommend_challenge,
)

urlpatterns = [
    path('quiz-questions/',     get_quiz_questions,     name='quiz-questions'),
    path('predict/',            quiz_predict,           name='quiz-predict'),
    path('predict_time/',       predict_time,           name='predict-time'),
    path('recommend_challenge/', recommend_challenge,    name='recommend-challenge'),
]
