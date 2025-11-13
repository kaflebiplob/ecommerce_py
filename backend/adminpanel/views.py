from django.shortcuts import render
from rest_framework import viewsets,permissions
from products.models import Product, Category
from orders.models import Order
from django.contrib.auth.models import User
from .serializers import ProductAdminSerializer, OrderAdminSerializer
# Create your views here.

class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and (request.user.is_staff or request.user.is_superuser))
    
class ProductAdminViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductAdminSerializer
    permission_classes = [IsAdminUser]
    
    
class OrderAdminViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderAdminSerializer
    permission_classes= [IsAdminUser]
