from django.db import models

import uuid
from users.models import User

PLAN_CHOICES = (
    ("free", "Free"),
    ("pro", "Pro"),
    ("enterprise", "Enterprise"),
)

PAYMENT_STATUS_CHOICES = (
    ("pending", "Pending"),
    ("completed", "Completed"),
    ("failed", "Failed"),
)

class Subscription(models.Model):
    """
    Handles user subscriptions to different plans
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="subscriptions")
    plan = models.CharField(max_length=20, choices=PLAN_CHOICES, default="free")
    start_date = models.DateTimeField(auto_now_add=True)
    end_date = models.DateTimeField(null=True, blank=True)
    active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.user.name} - {self.plan.capitalize()} Plan"


class PaymentTransaction(models.Model):
    """
    Stores payment transaction details for subscriptions
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="payments")
    subscription = models.ForeignKey(Subscription, on_delete=models.SET_NULL, null=True, related_name="transactions")
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    transaction_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=PAYMENT_STATUS_CHOICES, default="pending")
    transaction_id = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return f"Transaction {self.transaction_id} - {self.status}"