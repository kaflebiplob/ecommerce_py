from rest_framework import serializers
from products.models import Product,Category
from orders.models import Order
from address.models import Address
from discount.models import Discount
from support.models import Support

class ProductAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model= Product
        fields = '__all__'

class CategoryAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
        
class OrderAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields= '__all__'
        
class AddressAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'
        
class DiscountAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discount
        fields = '__all__'
        
    
# class SupportAdminSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Sup