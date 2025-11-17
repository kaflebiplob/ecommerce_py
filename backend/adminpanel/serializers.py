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
from products.serializers import ProductSerializer

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
    product = ProductSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(),
        source="product",
        write_only=True
    )
    class Meta:
        model = Discount
        fields = [
            "id",
            "product",     
            "product_id",   
            "discount_percent",
            "valid_from",
            "valid_to",
            "active",
        ]        
    
    def validate(self, data):
        product = data.get("product")
        active = data.get("active", True)

        # If it's updating, exclude the current discount from check
        discount_id = self.instance.id if self.instance else None

        if active:
            exists = Discount.objects.filter(
                product=product,
                active=True
            ).exclude(id=discount_id).exists()

            if exists:
                raise serializers.ValidationError(
                    {"active": "An active discount already exists for this product. Deactivate it first."}
                )

        return data
        
    
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
        fields = ['id','username','email','is_superuser', 'is_staff','is_active']
        
