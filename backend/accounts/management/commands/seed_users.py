from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from faker import Faker

fake = Faker()

class Command(BaseCommand):
    help = "Seed Sample Users and Admin"
    
    def handle(self, *args, **kwargs):
        self.stdout.write("Seeding Users and Admin...")
        
        # Create admin user
        admin, created = User.objects.get_or_create(
            username="admin",
            email="admin@ecommerce.com"
        )
        if created:
            admin.set_password("admin123")
            admin.is_staff = True
            admin.is_superuser = True
            admin.save()
            self.stdout.write(self.style.SUCCESS("Admin user created: username=admin, password=admin123"))
        else:
            self.stdout.write("ℹ️ Admin user already exists")
        
        # Create regular users
        for i in range(5):
            username = f"user{i}"
            user, created = User.objects.get_or_create(
                username=username,
                email=fake.email()
            )
            if created:
                user.set_password("password123")
                user.save()
                self.stdout.write(self.style.SUCCESS(f"User created: {username}"))
            
        self.stdout.write(self.style.SUCCESS("Successfully Created Users and Admin"))