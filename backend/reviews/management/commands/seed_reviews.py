from models import Review, Product
from django.contrib.auth.models import User 
from django.core.management.base import BaseCommand
import random
from faker import Faker


fake = Faker()


class Command(BaseCommand):
    help = "Seed Reviews for Products"
    def handle(self, *args, **kwargs):
        self.stdout.write("seeding Reviews...")
        
        users = User.objects.all()
        products = list(Product.objects.all())
        
        
        if not products:
            self.stdout.write("No products found. Please seed products first.")
            return
        
        for user in users:
            for product in random.sample(product,3):
                Review.objects.create(
                    user=user,
                    product=product,
                    rating=random.randint(1, 5),
                    comment=fake.sentence()
                )
        self.stdout.write("Reviews seeding completed.")
        