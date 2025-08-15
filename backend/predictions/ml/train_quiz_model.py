import pandas as pd
from sklearn.linear_model import SGDClassifier
from sklearn.preprocessing import StandardScaler, MinMaxScaler
from sklearn.pipeline import Pipeline
from sklearn.model_selection import GridSearchCV
from joblib import dump

def tune_and_train_model(
    data_path: str = "quiz_data.csv",
    model_path: str = "quiz_model_sgd_pipeline_tuned.joblib"
):
    """
    Reads quiz_data.csv, runs a GridSearch over our scaling+SGD pipeline,
    then saves the best pipeline to disk.
    """
    df = pd.read_csv(data_path)
    small_feats = [
        "months_experience", "loops_confidence",
        "knows_python", "ds_confidence", "debug_confidence"
    ]
    big_feats = ["xp", "quiz_score"]
    X = df[small_feats + big_feats]
    y = df["success_flag"]

    pipeline = Pipeline([
        ("small_ss", StandardScaler()),
        ("big_mm",   MinMaxScaler()),
        ("clf",      SGDClassifier(
            loss="log_loss",
            max_iter=1,
            warm_start=True
        )),
    ])

    param_grid = {
        "clf__alpha":   [1e-4, 1e-3, 1e-2, 1e-1],
        "clf__penalty": ["l2", "l1", "elasticnet"],
    }

    grid = GridSearchCV(
        pipeline,
        param_grid,
        cv=5,
        scoring="roc_auc",
        n_jobs=-1,
        verbose=1
    )
    print("[1/3] Fitting GridSearchCV…")
    grid.fit(X, y)

    best = grid.best_estimator_
    print(f"[2/3] Best params: {grid.best_params_}, AUC: {grid.best_score_:.3f}")
    
    dump(best, model_path)
    print(f"[3/3] Saved tuned pipeline to {model_path}")

if __name__ == "__main__":
    tune_and_train_model()
