from rest_framework import serializers
from .models import Payment


class PaymentSerializer(serializers.ModelSerializer):
    order_id = serializers.CharField(source = 'order.id', read_only=True)
    user = serializers.StringRelatedField(read_only=True)
    
    class Meta:
        model = Payment
        fields = [
            'id', 'order_id', 'user', 'payment_method', 'payment_id',
            'amount', 'status', 'transaction_date'
        ]
        read_only_fields = ['transaction_date']