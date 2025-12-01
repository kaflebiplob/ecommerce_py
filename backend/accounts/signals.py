from django.db.models.signals import post_migrate
from django.dispatch import receiver
from django.contrib.auth import get_user_model
import os

@receiver(post_migrate)
def create_default_admin(sender, **kwargs):
    if sender.name != "auth":
        return

    User = get_user_model()

    username = os.getenv("ADMIN_USERNAME", "admin")
    email = os.getenv("ADMIN_EMAIL", "admin@example.com")
    password = os.getenv("ADMIN_PASSWORD", "admin123")

    if not User.objects.filter(username=username).exists():
        admin = User.objects.create_superuser(
            username=username,
            email=email,
            password=password
        )

        admin.is_staff = True
        admin.is_superuser = True
        admin.is_active = True
        admin.save()

        print(f" Default admin created: {username}")
    else:
        print("Admin already exists — skipping creation")
