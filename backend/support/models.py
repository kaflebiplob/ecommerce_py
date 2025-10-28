from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class SupporTicket(models.Model):
    STATUS_CHOICES=[
        ('open','Open'),
        ('in_progress','In Progress'),
        ('closed','Closed'),
    ]
    user =models.ForeignKey(User,on_delete=models.CASCADE,related_name='support_tickets')
    subject = models.CharField(max_length=255)
    description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='open')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Ticket #{self.id} - {self.subject} ({self.status})"

class SupportMessage(models.Model):
    ticket = models.ForeignKey(SupporTicket, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_admin = models.BooleanField(default=False)
    
    def __str__(self):
        return f"Message from {self.sender.username} on Ticket #{self.ticket.id}"
    