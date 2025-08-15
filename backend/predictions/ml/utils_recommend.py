import os
import pandas as pd
from joblib import load
from django.conf import settings

# Path to your trained recommender pipeline
MODEL_PATH = os.path.join(settings.BASE_DIR, "predictions", "ml", "recommender_model.joblib")

_model = None

def _ensure_model_loaded():
    global _model
    if _model is None:
        if not os.path.exists(MODEL_PATH):
            raise RuntimeError("Recommender model missing; run train_recommender.py")
        _model = load(MODEL_PATH)
    return _model

def recommend_next_challenge(features: dict) -> str:
    """
    features must contain exactly:
      months_experience, xp, quiz_score, last_rate, current_topic
    """
    model = _ensure_model_loaded()

    # build a single‐row DataFrame
    df = pd.DataFrame([{
        "months_experience": features["months_experience"],
        "xp":                features["xp"],
        "quiz_score":        features["quiz_score"],
        "last_rate":         features["last_rate"],
        "current_topic":     features["current_topic"],
    }])

    # predict next topic index (1,2,3)
    next_id = int(model.predict(df)[0])

    # map back to slug
    id2slug = {
        1: "loops",
        2: "data_structures",
        3: "debugging",
    }
    return id2slug[next_id]
