from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from reviews.models import Review
from products.models import Product
from faker import Faker
import random

fake = Faker()

class Command(BaseCommand):
    help = "Seed reviews for products"

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.WARNING(" Seeding Reviews..."))

        users = User.objects.all()
        products = list(Product.objects.all())

        # Check if dependencies exist
        if not users.exists() or not products:
            self.stdout.write(self.style.ERROR(" Please seed users and products first!"))
            return

        for user in users:
            # Randomly select up to 3 products per user for reviews
            for product in random.sample(products, min(3, len(products))):
                Review.objects.create(
                    user=user,
                    product=product,
                    rating=random.randint(3, 5),
                    comment=fake.sentence(),
                )

        self.stdout.write(self.style.SUCCESS(" Reviews seeded successfully!"))
