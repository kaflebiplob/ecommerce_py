from django.shortcuts import render
from rest_framework import viewsets, status
from .models import Order,OrderItem
from .serializers import OrderSerializer, OrderItemSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from cart.models import Cart, CartItem
from rest_framework.decorators import action
from utils.email_utils import send_custom_email

# Create your views here.


class OrderViewset(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes =[ IsAuthenticated]
    
    def get_queryset(self):
        return Order.objects.filter(user = self.request.user)
    
    @action(detail=False, methods=['post'], url_path='place-order')
    def place_order(self, request):
        cart, _ = Cart.objects.get_or_create(user= request.user)
        if not cart.items.exists():
            return Response({"detail":"Cart is empty"},status=400)
        
        order = Order.objects.create(user=request.user)
        total_amount = 0
        
        for item in cart.items.all():
            OrderItem.objects.create(
                order = order,
                product = item.product,
                quantity = item.quantity,
                price = item.product.price,
                
            )
            total_amount += item.quantity * item.product.price
        order.total_amount = total_amount
        order.save()
        
        cart.items.all().delete()
        return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)
    
    @action(detail=False, methods=['post'], url_path='test_email')
    def test_email(self,request):
        user = request.user
        subject = 'Order Confirmation Of My Store'
        message = f"Hello {user.username}, Your order has been placed successfully."
        send_custom_email(subject, message, [user.email])
        return Response({"message": f"Email sent to {user.email}"})
    
    

        
    
    