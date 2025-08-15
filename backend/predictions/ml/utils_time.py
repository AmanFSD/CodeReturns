import os
import pandas as pd
from django.conf import settings
from joblib import load

MODEL_PATH = os.path.join(
    settings.BASE_DIR, "predictions", "ml", "time_model.joblib"
)

_model = None

def _load_model():
    global _model
    if _model is None:
        if not os.path.exists(MODEL_PATH):
            raise RuntimeError("Time model missing; run train_time_model.py")
        _model = load(MODEL_PATH)
    return _model

def predict_time_to_complete(features: dict) -> float:
    """
    Given features including 'difficulty', returns predicted solve time in minutes.
    Expects features dict with keys:
      months_experience, loops_confidence, knows_python,
      ds_confidence, debug_confidence, xp, quiz_score, difficulty
    """

    # 1) Build the negated-xp feature:
    neg_xp = -1 * features["xp"]

    # 2) Construct a single-row DataFrame with the exact column names
    df = pd.DataFrame([{
        "months_experience": features["months_experience"],
        "loops_confidence":  features["loops_confidence"],
        "knows_python":      features["knows_python"],
        "ds_confidence":     features["ds_confidence"],
        "debug_confidence":  features["debug_confidence"],
        "difficulty":        features["difficulty"],
        "neg_xp":            neg_xp,
        "quiz_score":        features["quiz_score"],
    }])

    # 3) Load the trained pipeline
    model = _load_model()

    # 4) Predict using the DataFrame
    #    This preserves column-names, so ColumnTransformer works correctly
    minutes = model.predict(df)[0]

    return float(minutes)
