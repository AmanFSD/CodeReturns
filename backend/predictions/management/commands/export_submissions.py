from django.core.management.base import BaseCommand
import csv
from challenges.models import Submission
from django.contrib.auth import get_user_model

User = get_user_model()

class Command(BaseCommand):
    help = "Export all submissions + XP + quiz score for ML training"

    def handle(self, *args, **opts):
        writer = csv.writer(self.stdout)
        # CSV header: include language one-hot later in training script
        writer.writerow([
            "months_experience", "loops_confidence", "knows_python",
            "ds_confidence", "debug_confidence", "language",
            "xp", "quiz_score", "succeeded"
        ])

        for sub in Submission.objects.select_related("user__profile", "challenge").all():
            profile = sub.user.profile
            # Extract known quick-quiz answers stored in profile.quiz_responses
            qr = profile.quiz_responses or {}
            # Safely parse numeric quiz inputs
            months = int(qr.get('_months', 0) or 0)
            loops  = int(qr.get('_loops', 3) or 3)
            knows  = int(qr.get('_knows', 0) or 0)
            ds     = int(qr.get('_ds', 3) or 3)
            debug  = int(qr.get('_debug', 3) or 3)
            # Compute average quiz score
            quiz_score = (months + loops + knows + ds + debug) / 5.0

            # Determine binary outcome from actual challenge submission
            succeeded = 1 if sub.result.lower() in ['passed', 'success'] else 0

            row = [
                months,
                loops,
                knows,
                ds,
                debug,
                sub.challenge.language,  # assume Challenge has `language` field
                profile.xp,
                quiz_score,
                succeeded,
            ]
            writer.writerow(row)