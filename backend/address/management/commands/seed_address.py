# from django.core.management.base import BaseCommand
# from address.models import Address
# from django.contrib.auth.models import User
# from faker import Faker
# import random

# fake = Faker()

# class Command(BaseCommand):
#     help = "Seed User Address"
    
#     def handle(self, *args, **kwargs):
#         self.stdout.write(self.style.WARNING(" Seeding addresses..."))

#         for user in User.objects.all():
#             Address.objects.create(
#                 user=user,
#                 full_name=fake.name(),
#                 phone=fake.phone_number(),
#                 address_line=fake.street_address(),
#                 city=fake.city(),
#                 state=fake.state(),
#                 country=fake.country(),
#                 zip_code=fake.zipcode(),
#                 is_default=True,
#             )
#         self.stdout.write(self.style.SUCCESS(" Addresses seeded successfully!"))
        
        

from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from address.models import Address
from faker import Faker
import random

fake = Faker()

class Command(BaseCommand):
    help = "Seed fake addresses for users"

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.WARNING("Seeding addresses..."))

        users = User.objects.all()

        if not users.exists():
            self.stdout.write(self.style.ERROR("No users found! Please seed users first."))
            return

        for user in users:
            for _ in range(random.randint(1, 2)):
                Address.objects.create(
                    user=user,
                    full_name=fake.name(),
                    phone=fake.phone_number()[:20],
                    address_line=fake.street_address(),
                    city=fake.city(),
                    state=fake.state(),
                    country=fake.country(),
                    zip_code=fake.postcode()[:20],
                    is_default=random.choice([True, False]),
                )

        self.stdout.write(self.style.SUCCESS("Addresses seeded successfully!"))
