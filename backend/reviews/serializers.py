from rest_framework import serializers
from .models import Review
from products.serializers import ProductSerializer

class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    product = ProductSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(
        queryset = Review.objects.all(), source="product",write_only=True
    )
    
    class Meta:
        model = Review
        fields =['id', 'user', 'product', 'product_id', 'rating', 'comment', 'created_at']