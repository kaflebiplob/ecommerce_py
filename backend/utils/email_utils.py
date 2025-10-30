from django.conf import settings
from django.core.mail import send_mail


def send_custom_email(subject,message,recipient_list,html_message=None):
    
    send_mail(
        subject,message,settings.DEFAULT_FROM_EMAIL if hasattr(settings,'DEFAULT_FROM_EMAIL') else 'noreply@example.com',
        recipient_list,fail_silently=False,html_message=html_message
        
        
    )
    