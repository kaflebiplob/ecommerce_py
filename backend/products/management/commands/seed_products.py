from django.contrib.auth.models import User
from products.models import Product, Category
from django.core.management.base import BaseCommand
import random
from faker import Faker

fake = Faker()

class Command(BaseCommand):
    help = "Seeding Products and Categories"
    
    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.WARNING("Seeding Products and Categories"))
        
        category_names = ["Electronics", "Clothing", "Home", "Sports", "Books"]
        categories = [Category.objects.get_or_create(name=name)[0] for name in category_names]
        
        for _ in range(20):
            Product.objects.create(
                name=fake.word(),
                description=fake.sentence(),
                price=random.uniform(10, 1000),
                category=random.choice(categories),
                stock=random.randint(10, 100),
            )
        self.stdout.write(self.style.SUCCESS("Products and Categories Seeded Succesfully"))
        
        


