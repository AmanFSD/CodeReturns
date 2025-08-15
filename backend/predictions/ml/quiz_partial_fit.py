import os
import numpy as np
from django.conf import settings
from joblib import load, dump

# Path to the incrementally‐trained model
MODEL_FILE = os.path.join(
    settings.BASE_DIR, "predictions", "ml", "quiz_model_sgd.joblib"
)

# Same cap as above
XP_CAP = 250

def partial_fit_one(features: dict, label: int, weight: float = 5.0):
    """
    Load the SGD model, partial_fit on one capped-XP example, then re-save.
    """
    # 1) Cap xp
    raw_xp = features.get("xp", 0)
    xp = raw_xp if raw_xp <= XP_CAP else XP_CAP

    # 2) Build feature array
    X = np.array([[
        features["months_experience"],
        features["loops_confidence"],
        features["knows_python"],
        features["ds_confidence"],
        features["debug_confidence"],
        xp,
        features["quiz_score"],
    ]])
    y = np.array([label])

    # 3) Load, update, and dump
    model = load(MODEL_FILE)
    model.partial_fit(X, y, classes=[0, 1], sample_weight=[weight])
    dump(model, MODEL_FILE)
