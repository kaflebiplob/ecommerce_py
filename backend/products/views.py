from django.shortcuts import render
from rest_framework import viewsets,filters
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Category, Product
from .serializers import CategorySerializer,ProductSerializer

# Create your views here.

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category']
    search_fields=['name','description']
    ordering_fields = ['price', 'created_at']
    ordering = ['-created_at']