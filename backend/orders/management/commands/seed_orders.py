from django.contrib.auth.models import User
from orders.models import Order,OrderItem
from products.models import Product
from django.core.management.base import BaseCommand
from faker import Faker
import random

fake= Faker()

class Command(BaseCommand):
    help="Seeding Orders"
    
    def handle(self, *args,**kwargs):
        self.stdout.write(self.style.WARNING("Seeding Orders"))
        
        users = User.objects.all()
        products = list(Product.objects.all())
        
        if not users or not products:
            self.stdout.write(self.style.ERROR("No users or products found"))
            return
        
        for user in users:
            order = Order.objects.create(user=user, total_amount=0)
            total = 0
            for product in random.sample(products, 2):
                qty = random.randint(1, 3)
                OrderItem.objects.create(order=order, product=product, quantity=qty, price=product.price)
                total += qty * product.price
            order.total_amount = total
            order.save()

        self.stdout.write(self.style.SUCCESS(" Orders seeded successfully!"))