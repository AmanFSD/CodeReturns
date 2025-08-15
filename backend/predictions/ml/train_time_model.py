
import pandas as pd
import numpy as np
import os
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler, MinMaxScaler
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from joblib import dump

def train_time_model(
    data_path: str = "time_data.csv",
    model_path: str = "time_model.joblib"
):
    """
    Trains a regression pipeline to predict solve_time, with XP inverted
    so that higher XP drives predicted times downward.
    """
    df = pd.read_csv(data_path)

    # Invert XP to ensure higher XP => shorter predicted time
    df["neg_xp"] = -1 * df["xp"]

    # Feature grouping
    numeric_feats = [
        "months_experience",
        "loops_confidence",
        "knows_python",
        "ds_confidence",
        "debug_confidence",
        "difficulty"
    ]
    score_feat = ["quiz_score"]

    X = df[numeric_feats + ["neg_xp"] + score_feat]
    y = df["solve_time"]

    # Preprocessor: standardize small numeric, MinMax-scale neg_xp & quiz_score
    preprocessor = ColumnTransformer(
        transformers=[
            ("std", StandardScaler(), numeric_feats),
            ("minmax_xp", MinMaxScaler(), ["neg_xp"]),
            ("minmax_score", MinMaxScaler(), score_feat),
        ],
        remainder="drop"
    )

    pipeline = Pipeline([
        ("preproc", preprocessor),
        (
            "regressor",
            RandomForestRegressor(
                n_estimators=100,
                random_state=42,
                n_jobs=-1
            )
        ),
    ])

    pipeline.fit(X, y)
    dump(pipeline, model_path)
    print(
        f"[✓] Time-model trained on {len(df)} samples "
        f"and saved to {model_path}"
    )

if __name__ == "__main__":
    train_time_model()
