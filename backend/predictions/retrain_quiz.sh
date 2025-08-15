#!/usr/bin/env bash
set -euo pipefail

# ─── CONFIG ────────────────────────────────────────────────────────────────────
PROJECT_ROOT="/Users/aman/Documents/codereturnsproject/backend"
VENV_ACTIVATE="$PROJECT_ROOT/.venv/bin/activate"
ML_DIR="$PROJECT_ROOT/predictions/ml"
EXPORT_CMD="python3 $PROJECT_ROOT/manage.py export_submissions"
UPDATE_SCRIPT="python3 update_quiz_model.py new_submissions.csv"
LOGFILE="$PROJECT_ROOT/logs/quiz_retrain_$(date +%F).log"
# ────────────────────────────────────────────────────────────────────────────────

# 1) Enter project, activate venv
cd "$PROJECT_ROOT"
source "$VENV_ACTIVATE"

# make sure logs directory exists
mkdir -p "$(dirname "$LOGFILE")"

{
  echo "=== Retrain started at $(date) ==="

  # 2) Dump new submissions
  echo "[1/3] Exporting new submissions..."
  $EXPORT_CMD > "$ML_DIR/new_submissions.csv"

  # 3) Incremental update
  echo "[2/3] Running incremental update..."
  cd "$ML_DIR"
  $UPDATE_SCRIPT

  echo "[3/3] Done. Cleaning up…"
  rm -f new_submissions.csv

  echo "=== Retrain finished at $(date) ==="
} &>> "$LOGFILE"

# 4) Deactivate
deactivate

