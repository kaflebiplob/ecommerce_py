from django.db import models
from django.contrib.auth.models import User
from products.models import Product

# Create your models here.


class Order(models.Model):
    STATUS_CHOICES=(
        ('pending','Pending'),
        ('processing',"Processing"),
        ('completed','Completed'),
        ('canceled','Canceled'),
    )
    
    user = models.ForeignKey(User, on_delete=models.CASCADE,related_name='orders')
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20,choices=STATUS_CHOICES,default='pending')
    total_amount= models.DecimalField(max_digits=10,decimal_places=2, default=0.00)
    updated_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Order #{self.id} by {self.user.username} -{self.status} "
    
    def update_total(self):
        self.total_amount = sum(item.subtotal for item in self.items.all())
        self.save()
    
class OrderItem(models.Model):
    order = models.ForeignKey(Order,on_delete=models.CASCADE,related_name='items')
    product = models.ForeignKey(Product,on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10,decimal_places=2)
    
    @property
    def subtotal(self):
        return self.quantity * self.price
    
    def __str__(self):
        return f"{self.product.name}  X {self.quantity}"
      