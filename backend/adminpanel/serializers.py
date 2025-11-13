from rest_framework import serializers
from products.models import Product
from orders.models import Order

class ProductAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model= Product
        fields = '__all__'
        
class OrderAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields= '__all__'
        