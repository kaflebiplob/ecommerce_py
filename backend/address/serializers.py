from rest_framework import serializers
from .models import Address

class AddressSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    class Meta:
        model = Address
        fields = ['id', 'user', 'full_name', 'phone', 'address_line', 'city', 'state', 'country', 'zip_code', 'is_default', 'created_at']
        read_only_fields = ['id', 'created_at']
        