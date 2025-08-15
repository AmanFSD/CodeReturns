import pandas as pd
import numpy as np
import os

SCRIPT_DIR  = os.path.dirname(os.path.abspath(__file__))
OUTPUT_PATH = os.path.join(SCRIPT_DIR, "rec_data.csv")

def generate_rec_data(
    n_samples:   int    = 5000,
    output_path: str    = OUTPUT_PATH,
    noise_frac:  float  = 0.1   # 10% label noise
):
    """
    Creates synthetic rec_data.csv with columns:
      - months_experience (0,1,6,12,24)
      - xp (0–300)
      - quiz_score (0–100)
      - last_rate (0–1 random feedback)
      - current_topic (1=loops,2=data_structures,3=debugging)
      - next_topic (1/2/3) with noise + xp dependency
    """
    rng = np.random.default_rng(123)

    # Base features
    months_exp   = rng.choice([0,1,6,12,24], n_samples, p=[.2,.3,.2,.2,.1])
    xp           = rng.integers(0,300, size=n_samples)
    quiz_score   = rng.integers(0,100, size=n_samples)
    last_rate    = rng.random(size=n_samples)

    # Simulate current_topic uniformly
    current_topic = rng.choice([1,2,3], size=n_samples)

 
    norm_xp = xp / xp.max()              # 0–1
    score  = 0.7 * last_rate + 0.3 * norm_xp
    base_next = np.where(
        score < 0.33, 1,
        np.where(score < 0.66, 2, 3)
    )

    flip_mask    = rng.random(n_samples) < noise_frac
    flip_choices = rng.choice([1,2,3], size=n_samples)
    next_topic = np.where(flip_mask, flip_choices, base_next)

    # Build DataFrame
    df = pd.DataFrame({
        "months_experience": months_exp,
        "xp":                xp,
        "quiz_score":        quiz_score,
        "last_rate":         last_rate,
        "current_topic":     current_topic,
        "next_topic":        next_topic,
    })

    # Save
    df.to_csv(output_path, index=False)
    print(f"[✓] Synthetic recommendation data ({n_samples} rows) saved to:\n    {output_path}")

if __name__ == "__main__":
    generate_rec_data()
