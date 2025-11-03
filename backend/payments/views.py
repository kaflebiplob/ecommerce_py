from .serializers import PaymentSerializer
from .models import Payment
from rest_framework import viewsets, permissions
# Create your views here.

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all().order_by('-transaction_date')
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Payment.objects.all()
        
        return Payment.objects.filter(user=user)