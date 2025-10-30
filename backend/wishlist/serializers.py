from rest_framework import serializers
from .models import Wishlist
from products.serializers import ProductSerializer
from products.models import Product

class WishlistSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(
        queryset =  Product.objects.all(), write_only = True, source = 'product'
    )
    
    class Meta:
        model = Wishlist
        fields = ['id', 'user','product','product_id','added_at']
        read_only_fields = ['id','user','added_at']