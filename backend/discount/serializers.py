from rest_framework import serializers
from .models import Discount
from products.serializers import ProductSerializer


class DiscountSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only= True)
    product_id = serializers.PrimaryKeyRelatedField(
        queryset = Discount._meta.get_field('product').remote_field.model.objects.all(),
        source = 'product',
        write_only =True
    )
    class Meta:
        model = Discount
        fields = ['id', 'product', 'product_id', 'discount_percent', 'valid_from', 'valid_to', 'active']