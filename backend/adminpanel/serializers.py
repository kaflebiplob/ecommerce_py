from rest_framework import serializers
from products.models import Product,Category
from orders.models import Order
from address.models import Address
from discount.models import Discount
from support.models import SupporTicket,SupportMessage
from cart.models import Cart
from reviews.models import Review
from payments.models import Payment
from django.contrib.auth.models import User

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
        
    
class SupportAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = SupporTicket
        fields = '__all__'

class ReviewAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class CartAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'
        read_only_fields = fields
        
class PaymentAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'
        
class UserAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['is','username','email','is_superuser', 'is_staff','is_active']
        
