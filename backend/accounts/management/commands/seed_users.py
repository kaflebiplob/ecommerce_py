from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from faker  import Faker

fake = Faker()
class Command(BaseCommand):
    help = "Seed Sample Users"
    
    def handle(self, *args, **kwargs):
        self.stdout.write("Seeding Users..")
        
        for i in range(5):
            username = f"user{i}"
            user,created = User.objects.get_or_create(
                username=username)
            if created:
                user.email = fake.email()
                user.set_password("password123")
                user.save()
            
        self.stdout.write(self.style.SUCCESS("Successfully Created Users"))
