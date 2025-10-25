from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import action
from rest_framework import serializers, viewsets
from .models import Cart,CartItem
from .serializers import CartItemSerializer, CartSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from products.models import Product

class CartViewSet(viewsets.ModelViewSet):
    serializer_class = CartItemSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return Cart.objects.filter(user = self.request.user)
    def get_object(self):
        cart,_ = Cart.objects.get_or_create(user= self.request.user)
        return cart
    
    def list(self,request):
        cart = self.get_object()
        serializer = CartSerializer(cart)
        return Response(serializer.data)
    
    @action(detail=False,methods=['post'], url_path='add')
    def add_to_cart(self,request):
        product_id = request.data.get('product_id')
        quantity = request.data.get('quantity',1)
        cart = self.get_object()
        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({'error':'Product not found'},status=404)
        
        cart_item,created= CartItem.objects.get_or_create(cart=cart,product=product)
        if not created:
            cart_item.quantity += quantity
        else:
            cart_item.quantity = quantity
        cart_item.save()
        
        return Response({'message':'Product added to cart successfully'})
    
    @action(detail=False,methods=['patch'],url_path='update')
    def update_cart_item(self,request):
        product_id = request.data.get('product_id')
        quantity = int(request.data.get('quantity',1))
        cart = self.get_object()
        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({'error':'Product not found'},status=404)
        try:
            cart_item = CartItem.objects.get(cart=cart, product_id=product_id)
        except CartItem.DoesNotExist:
            return Response({'error':'Cart item not found'},status=404)
        
        if quantity<=0:
            cart_item.delete()
            return Response({'message':'cart item removed succesfully'})
        cart_item.quantity = quantity
        cart_item.save()
        return Response({'message':'Cart item updated successfully'})

    
    @action(detail=False,methods=['delete'], url_path='clear')
    def clear_cart(self,request):
        cart = self.get_object()
        cart.items.all().delete()
        return Response({'message':'Cart cleared successfully'})
    
    
    
    