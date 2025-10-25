from rest_framework import serializers
from .models import CartItem, Cart
from products.models import Product
from products.serializers import ProductSerializer


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(
        queryset = Product.objects.all(),source='product',write_only = True
    )
    class Meta:
        model = CartItem
        fields = ['id','product_id','product','quantity']

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True,read_only=True)
    total_items = serializers.ReadOnlyField()
    total_price = serializers.ReadOnlyField()
    
    class Meta:
        model = Cart
        fields = ['id','user','items','total_items','total_price']
        read_only_feilds = ['user']       