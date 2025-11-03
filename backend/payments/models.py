from django.db import models
from django.contrib.auth.models import User
from orders.models import Order
import random
# Create your models here.


class Payment(models.Model):
    PAYMENT_CHOICE = [
        ('COD','Cash on Delivery'),
        ('ESEWA','Esewa'),
        ('KHALTI','Khalti')
    ]
    STATUS_CHOICES = [
        ('PENDING','Pending'),
        ('COMPLETED','Completed'),
        ('FAILED','Failed'),
        ('REFUNDED','Refunded')
    ]
    order = models.ForeignKey(Order,on_delete=models.CASCADE, related_name='payments')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    payment_method =  models.CharField(max_length=20, choices=PAYMENT_CHOICE, default='COD')
    payment_id = models.CharField(max_length=255, blank=True, null=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    transaction_date = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.payment_method} - {self.status}"
    
    def save(self, *args, **kwargs):
        if self.status == 'COMPLETED' and not self.payment_id:
            # Generate unique 6-digit payment ID
            while True:
                new_payment_id = str(random.randint(100000, 999999))
                if not Payment.objects.filter(payment_id=new_payment_id).exists():
                    self.payment_id = new_payment_id
                    break
        super().save(*args, **kwargs)

