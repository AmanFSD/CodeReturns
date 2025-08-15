import pandas as pd
import numpy as np

# define the set of languages you support
LANGUAGES = ["python", "javascript", "java", "c++"]


def generate_synthetic_data(
    n_samples: int = 10000,
    output_path: str = "quiz_data.csv"
):
    """
    Creates a synthetic quiz dataset with:
      - months_experience (0,1,6,12,24)
      - loops_confidence (1–5)
      - knows_python (0/1)
      - ds_confidence (1–5)
      - debug_confidence (1–5)
      - language (one of LANGUAGES)
      - correct_answers (0–max_questions)
      - solved_challenges (0–max_challenges)
      - xp calculated as (correct_answers × 5) + (solved_challenges × 10) + bonus
      - quiz_score (percentage of correct answers)
      - success_flag (0/1) based on a noisy linear combination including xp and quiz_score
    """
    np.random.seed(42)

    # Base features
    months_exp        = np.random.choice([0, 1, 6, 12, 24], size=n_samples,
                                         p=[0.2, 0.3, 0.2, 0.2, 0.1])
    loops_conf        = np.random.randint(1, 6, size=n_samples)
    knows_python      = np.random.choice([0,1], size=n_samples, p=[0.5,0.5])
    ds_conf           = np.random.randint(1, 6, size=n_samples)
    debug_conf        = np.random.randint(1, 6, size=n_samples)
    languages         = np.random.choice(LANGUAGES, size=n_samples)

    # Simulate quiz and challenge counts
    max_questions     = 20
    max_challenges    = 5
    correct_answers   = np.random.randint(0, max_questions + 1, size=n_samples)
    solved_challenges = np.random.randint(0, max_challenges + 1, size=n_samples)

    # Calculate xp: 5 per correct quiz, 10 per challenge, plus random bonus
    bonus = np.random.choice([0, 50, 100], size=n_samples, p=[0.7,0.2,0.1])
    xp = correct_answers * 5 + solved_challenges * 10 + bonus

    # Derive quiz_score as percentage
    quiz_score = (correct_answers / max_questions * 100).astype(int)

    # Compute a combined score for success_flag
    base_score = (
        0.1 * months_exp +
        0.2 * loops_conf +
        0.3 * knows_python +
        0.2 * ds_conf +
        0.2 * debug_conf
    )
    noise = np.random.normal(0, 0.5, size=n_samples)
    norm_xp = xp / np.max(xp)
    norm_score = quiz_score / 100
    combined = base_score + 0.01 * norm_xp + 0.01 * norm_score + noise
    success_flag = (combined > np.percentile(combined, 50)).astype(int)

    # Build DataFrame
    df = pd.DataFrame({
        "months_experience":    months_exp,
        "loops_confidence":     loops_conf,
        "knows_python":         knows_python,
        "ds_confidence":        ds_conf,
        "debug_confidence":     debug_conf,
        "language":             languages,
        "correct_answers":      correct_answers,
        "solved_challenges":    solved_challenges,
        "xp":                   xp,
        "quiz_score":           quiz_score,
        "success_flag":         success_flag,
    })

    df.to_csv(output_path, index=False)
    print(f"[✓] Synthetic data ({n_samples} rows) saved to {output_path}")


if __name__ == "__main__":
    generate_synthetic_data()
