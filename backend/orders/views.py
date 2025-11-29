from django.shortcuts import render
from rest_framework import viewsets, status
from .models import Order, OrderItem
from .serializers import OrderSerializer, OrderItemSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from cart.models import Cart, CartItem
from rest_framework.decorators import action
from utils.email_utils import send_custom_email
from django.db import transaction


class OrderViewset(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)
    
    @action(detail=False, methods=['post'], url_path='place-order')
    def place_order(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        
        if not cart.items.exists():
            return Response({"detail": "Cart is empty"}, status=400)
        
        # Use transaction to ensure all operations succeed or rollback
        try:
            with transaction.atomic():
                # First, check if all products have enough stock
                for item in cart.items.all():
                    product = item.product
                    
                    # Check if product has a quantity field
                    if hasattr(product, 'quantity'):
                        if product.quantity < item.quantity:
                            return Response({
                                "detail": f"Sorry, only {product.quantity} units of '{product.name}' are available in stock",
                                "out_of_stock": True,
                                "product_name": product.name,
                                "available_quantity": product.quantity,
                                "requested_quantity": item.quantity
                            }, status=status.HTTP_400_BAD_REQUEST)
                
                # Create the order
                order = Order.objects.create(user=request.user)
                total_amount = 0
                
                # Create order items and reduce product quantities
                for item in cart.items.all():
                    # Create order item
                    OrderItem.objects.create(
                        order=order,
                        product=item.product,
                        quantity=item.quantity,
                        price=item.product.price,
                    )
                    
                    # Calculate total
                    total_amount += item.quantity * item.product.price
                    
                    # Reduce product quantity
                    if hasattr(item.product, 'quantity'):
                        item.product.quantity -= item.quantity
                        item.product.save()
                
                # Save total amount
                order.total_amount = total_amount
                order.save()
                
                # Clear the cart
                cart.items.all().delete()
                
                try:
                    subject = 'Order Confirmation - My Store'
                    message = f"Hello {request.user.username},\n\nYour order #{order.id} has been placed successfully!\n\nTotal Amount: ₹{total_amount}\n\nThank you for shopping with us!"
                    send_custom_email(subject, message, [request.user.email])
                except Exception as email_error:
                    print(f"Email sending failed: {email_error}")
                
                return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)
                
        except Exception as e:
            return Response({
                "detail": f"Failed to place order: {str(e)}"
            }, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['post'], url_path='test_email')
    def test_email(self, request):
        user = request.user
        subject = 'Order Confirmation Of My Store'
        message = f"Hello {user.username}, Your order has been placed successfully."
        send_custom_email(subject, message, [user.email])
        return Response({"message": f"Email sent to {user.email}"})