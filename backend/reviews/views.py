from django.shortcuts import render
from .serializers import ReviewSerializer
from rest_framework.response import Response
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from .models import Review

# Create your views here.

class ReviewViewSet(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    
    def get_queryset(self):
        product_id = self.request.query_params.get('product_id')
        if product_id:
            return Review.objects.filter(product_id=product_id)
        return Review.objects.all()
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
