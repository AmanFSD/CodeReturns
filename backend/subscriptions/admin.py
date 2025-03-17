from django.contrib import admin
from .models import Subscription, PaymentTransaction

@admin.register(Subscription)
class SubscriptionAdmin(admin.ModelAdmin):
    list_display = ("user", "plan", "start_date", "end_date", "active")
    list_filter = ("plan", "active", "start_date", "end_date")
    search_fields = ("user__name", "plan")
    ordering = ("start_date",)
    list_editable = ("active",)
    list_per_page = 25

@admin.register(PaymentTransaction)
class PaymentTransactionAdmin(admin.ModelAdmin):
    list_display = ("user", "subscription", "amount", "status", "transaction_date")
    list_filter = ("status", "transaction_date")
    search_fields = ("user__name", "transaction_id", "subscription__plan")
    ordering = ("transaction_date",)
    list_per_page = 25