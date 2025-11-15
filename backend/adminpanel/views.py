from django.shortcuts import render
from rest_framework import viewsets,permissions
from products.models import Product, Category
from orders.models import Order
from django.contrib.auth.models import User
from .serializers import ProductAdminSerializer, OrderAdminSerializer, CategoryAdminSerializer,AddressAdminSerializer,SupportAdminSerializer,PaymentAdminSerializer,UserAdminSerializer,DiscountAdminSerializer,ReviewAdminSerializer,CartAdminSerializer
from payments.models import Payment
from discount.models import Discount
from reviews.models import Review
from address.models import Address
from cart.models import Cart
from support.models import SupporTicket, SupportMessage
# Create your views here.

class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and (request.user.is_staff or request.user.is_superuser))
    
class ProductAdminViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductAdminSerializer
    permission_classes = [IsAdminUser]
    
class CategoryAdminViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_classes = CategoryAdminSerializer
    parser_classes = [IsAdminUser]
    
    
class OrderAdminViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderAdminSerializer
    permission_classes= [IsAdminUser]
    
class AddressAdminViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressAdminSerializer
    permission_classes = [IsAdminUser]
    
class DiscountAdminViewSet(viewsets.ModelViewSet):
    queryset = Discount.objects.all()
    serializer_class = DiscountAdminSerializer
    permission_classes = [IsAdminUser]
    
class PaymentAdminViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentAdminSerializer
    permission_classes=[IsAdminUser]
    
class UserAdminViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserAdminSerializer
    permission_classes = [IsAdminUser]
    
class CartAdminViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartAdminSerializer
    permission_classes = [IsAdminUser]
    
class ReviewAdminViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewAdminSerializer
    permission_classes = [IsAdminUser]
    
class SupportAdminViewSet(viewsets.ModelViewSet):
    queryset = SupporTicket.objects.all()
    serializer_class = SupportAdminSerializer
    permission_classes = [IsAdminUser]
    
    
