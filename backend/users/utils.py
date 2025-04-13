from users.models import UserProfile, Badge, UserBadge

def reward_xp_and_badges(user, xp_earned=50):
    profile, _ = UserProfile.objects.get_or_create(user=user)
    profile.xp = getattr(profile, "xp", 0) + xp_earned
    profile.save()

    # Threshold-based badge assignment
    badge_conditions = [
        (100, "Beginner"),
        (300, "Achiever"),
        (500, "Champion"),
    ]

    for threshold, title in badge_conditions:
        if profile.xp >= threshold:
            badge = Badge.objects.filter(title=title).first()
            if badge:
                UserBadge.objects.get_or_create(user=user, badge=badge)