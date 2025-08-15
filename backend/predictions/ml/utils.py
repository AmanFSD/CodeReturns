import os
from django.conf import settings
from joblib import load

MODEL_PATH = os.path.join(
    settings.BASE_DIR, "predictions", "ml", "quiz_model_sgd_pipeline.joblib"
)

_model = None

def _ensure_model_loaded():
    global _model
    if _model is None:
        if not os.path.isfile(MODEL_PATH):
            raise RuntimeError(
                f"No model at {MODEL_PATH}. Run train_model.py first."
            )
        _model = load(MODEL_PATH)
    return _model

def predict_success(features: dict) -> float:
    """
    Normalizes features exactly as in training pipeline:
      - Standard scale on the 1–5 features
      - MinMax on xp & quiz_score (0–1)
    Returns a float probability between 0 and 1.
    """
    model = _ensure_model_loaded()

    # Build ordered input row
    X_row = [[
        features["months_experience"],
        features["loops_confidence"],
        features["knows_python"],
        features["ds_confidence"],
        features["debug_confidence"],
        features["xp"],
        features["quiz_score"],
    ]]

    # Pipeline handles scaling + prediction
    return float(model.predict_proba(X_row)[0][1])
