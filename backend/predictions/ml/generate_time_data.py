import pandas as pd
import numpy as np
import os

# ─── Configuration ─────────────────────────────────────────────────────────────
SCRIPT_DIR   = os.path.dirname(os.path.abspath(__file__))
OUTPUT_PATH  = os.path.join(SCRIPT_DIR, "time_data.csv")
# Define “typical” mean solve times (in minutes) per difficulty
DIFFICULTY_MEAN = {
    1: 5,    # easy
    2: 15,   # medium
    3: 30,   # hard
}
# ────────────────────────────────────────────────────────────────────────────────

def generate_time_data(
    n_samples: int = 10000,
    output_path: str = OUTPUT_PATH
):
    """
    Simulate time-to-complete dataset:
      - months_experience, loops_confidence, knows_python, ds_confidence, debug_confidence
      - xp, quiz_score
      - difficulty (1=easy,2=medium,3=hard)
      - solve_time (minutes), where:
          * easy ~ ~5 min ± noise
          * medium ~ ~15 min ± noise
          * hard ~ ~30 min ± noise
        minus a small bonus for higher XP, plus random Gaussian noise.
    """
    rng = np.random.default_rng(42)

    # 1) Core features
    months_exp   = rng.choice([0,1,6,12,24], n_samples, p=[.2,.3,.2,.2,.1])
    loops_conf   = rng.integers(1,6, size=n_samples)
    knows_python = rng.choice([0,1], size=n_samples)
    ds_conf      = rng.integers(1,6, size=n_samples)
    debug_conf   = rng.integers(1,6, size=n_samples)

    # 2) Quiz & XP
    max_q         = 20
    correct_q     = rng.integers(0, max_q+1, size=n_samples)
    bonus_chal    = rng.integers(0,6, size=n_samples)  # fake challenge count
    xp            = correct_q * 5 + bonus_chal * 10
    quiz_score    = (correct_q / max_q * 100).astype(int)

    # 3) Difficulty label
    difficulty    = rng.integers(1, 4, size=n_samples)  # 1,2,3

    # 4) Compute solve_time
    #    base_time = mean_time_by_difficulty + gaussian_noise
    #    xp_bonus  = reduce time by xp_factor (0.01 min per XP point)
    noise        = rng.normal(0, 3, size=n_samples)  # ±3 min noise
    base_mean    = np.array([DIFFICULTY_MEAN[d] for d in difficulty])
    # Subtract a small amount proportional to xp (capped)
    xp_bonus     = np.clip(xp * 0.01, 0, 10)  # max 10 min reduction
    solve_time   = base_mean - xp_bonus + noise
    # Floor at 1 minute
    solve_time   = np.clip(solve_time, 1, None)

    # 5) Build DataFrame
    df = pd.DataFrame({
        "months_experience": months_exp,
        "loops_confidence":  loops_conf,
        "knows_python":      knows_python,
        "ds_confidence":     ds_conf,
        "debug_confidence":  debug_conf,
        "xp":                xp,
        "quiz_score":        quiz_score,
        "difficulty":        difficulty,
        "solve_time":        solve_time.round(2),
    })

    df.to_csv(output_path, index=False)
    print(f"[✓] Synthetic time data ({n_samples} rows) saved to:\n    {output_path}")


if __name__ == "__main__":
    generate_time_data()
