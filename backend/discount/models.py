from django.db import models
from products.models import Product

class Discount(models.Model):
    product =  models.ForeignKey(Product,on_delete=models.CASCADE)
    discount_percent = models.DecimalField(max_digits=10,decimal_places=2)
    valid_from = models.DateField()
    valid_to = models.DateField()
    active = models.BooleanField(default=True)
    
    
    def __str__(self):
        return f"{self.product.name} - {self.discount_percent}%"