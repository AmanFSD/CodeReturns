import os
import pandas as pd
from joblib import dump
from sklearn.ensemble import RandomForestClassifier
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.pipeline import Pipeline

SCRIPT_DIR       = os.path.dirname(__file__)
DATA_PATH        = os.path.join(SCRIPT_DIR, "rec_data.csv")
MODEL_PATH       = os.path.join(SCRIPT_DIR, "recommender_model.joblib")

def train_recommender():
    if not os.path.exists(DATA_PATH):
        print("[!] rec_data.csv missing – run generate_rec_data.py first.")
        return

    df = pd.read_csv(DATA_PATH)

    # FEATURES:
    #   - months_experience (numeric)
    #   - xp                (numeric)
    #   - quiz_score        (numeric)
    #   - last_rate         (numeric)
    #   - current_topic     (categorical: 1,2,3)
    # TARGET: next_topic

    X_num = ["months_experience", "xp", "quiz_score", "last_rate"]
    X_cat = ["current_topic"]

    preprocessor = ColumnTransformer([
        ("num", StandardScaler(), X_num),
        ("cat", OneHotEncoder(sparse_output=False), X_cat),
    ])

    pipeline = Pipeline([
        ("prep", preprocessor),
        ("clf",  RandomForestClassifier(n_estimators=100, random_state=42)),
    ])

    X = df[X_num + X_cat]
    y = df["next_topic"]

    print(f"[1/2] Training on {len(df)} rows…")
    pipeline.fit(X, y)
    dump(pipeline, MODEL_PATH)
    print(f"[2/2] Saved recommender_model to {MODEL_PATH}")

if __name__ == "__main__":
    train_recommender()
