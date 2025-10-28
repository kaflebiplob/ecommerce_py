from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import viewsets,permissions
from .serializers import SupporTicketSerializer,SupportMessageSerializer
from .models import SupporTicket, SupportMessage
from rest_framework.decorators import action
# Create your views here.


class SupportTicketViewSet(viewsets.ModelViewSet):
    serializer_class = SupporTicketSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    
    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return SupporTicket.objects.all()
        return SupporTicket.objects.filter(user=user)
    
    def perform_create(self, serializer):
        return serializer.save(self.request.user)
    
    @action(detail =True, methods='post')
    def add_message(self, request, pk=None):
        ticket = self.get_object()
        message_text = request.data.get('message')
        if not message_text:
            return Response({'error':'Message text is required'}, status=400)
        
        message = SupportMessage.objects.create(
            ticket = ticket,
            sender = request.user,
            message = message_text,
            is_admin = request.user.is_staff
        )
        serializer = SupportMessageSerializer(message)
        return Response(serializer.data, status=201)
    
    
        