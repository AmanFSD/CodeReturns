import sys
import pandas as pd
from sklearn.linear_model import LogisticRegression
from joblib import dump

def update_model(
    new_data_path: str,
    data_path: str = "quiz_data.csv",
    model_path: str = "quiz_model.joblib"
):
    """
    Appends new quiz submissions (CSV) to the existing dataset,
    retrains the model on the combined data, and re-saves it.
    Usage:
      python update_quiz_model.py new_submissions.csv
    """
    # 1. Load existing and new data
    df_existing = pd.read_csv(data_path)
    df_new      = pd.read_csv(new_data_path)
    df_all      = pd.concat([df_existing, df_new], ignore_index=True)

    # 2. Persist the combined dataset
    df_all.to_csv(data_path, index=False)

    # 3. Retrain
    X = df_all[[
        "months_experience",
        "loops_confidence",
        "knows_python",
        "ds_confidence",
        "debug_confidence"
    ]]
    y = df_all["success_flag"]

    model = LogisticRegression(max_iter=1000)
    model.fit(X, y)
    dump(model, model_path)

    print(f"[✓] Added {len(df_new)} new samples; retrained on {len(df_all)} total, saved to {model_path}")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python update_quiz_model.py <new_data.csv>")
        sys.exit(1)
    update_model(sys.argv[1])
