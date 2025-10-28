from rest_framework import serializers
from .models import SupporTicket, SupportMessage

class SupportMessageSerializer(serializers.ModelSerializer):
    sender = serializers.StringRelatedField(read_only= True)
    class Meta:
        model = SupportMessage
        fields =['id','sender','message','created_at','is_admin']
        
class SupporTicketSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    messages = SupportMessageSerializer(many=True, read_only=True)
    
    class Meta:
        model = SupporTicket
        fields = ['id','user','subject','description','status','created_at','updated_at','messages']
