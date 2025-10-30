from django.shortcuts import render
from .serializers import WishlistSerializer
from .models import Wishlist
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
# Create your views here.

class WishlistViewSet(viewsets.ModelViewSet):
    serializer_class = WishlistSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Wishlist.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
