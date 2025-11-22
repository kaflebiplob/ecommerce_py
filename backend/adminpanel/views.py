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
from rest_framework.decorators import action,api_view,permission_classes
from rest_framework.response import Response
from django.db.models.functions import TruncMonth
from django.db.models import Count
from django.utils.timezone import now
from datetime import timedelta
# Create your views here.\
    

class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and (request.user.is_staff or request.user.is_superuser))
    
class ProductAdminViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('-id')
    serializer_class = ProductAdminSerializer
    permission_classes = [IsAdminUser]
    
class CategoryAdminViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by('-id')
    serializer_class = CategoryAdminSerializer
    permission_classes = [IsAdminUser]
    
    
class OrderAdminViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all().order_by('-id')
    serializer_class = OrderAdminSerializer
    permission_classes= [IsAdminUser]
    
class AddressAdminViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all().order_by('-id')
    serializer_class = AddressAdminSerializer
    permission_classes = [IsAdminUser]
    
class DiscountAdminViewSet(viewsets.ModelViewSet):
    queryset = Discount.objects.all().order_by('-id')
    serializer_class = DiscountAdminSerializer
    permission_classes = [IsAdminUser]
    
class PaymentAdminViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentAdminSerializer
    permission_classes=[IsAdminUser]
    
class UserAdminViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-id')
    serializer_class = UserAdminSerializer
    permission_classes = [IsAdminUser]
    
class CartAdminViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartAdminSerializer
    permission_classes = [IsAdminUser]
    
class ReviewAdminViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all().order_by('-id')
    serializer_class = ReviewAdminSerializer
    permission_classes = [IsAdminUser]
    
class SupportAdminViewSet(viewsets.ModelViewSet):
    queryset = SupporTicket.objects.all().order_by('-id')
    serializer_class = SupportAdminSerializer
    permission_classes = [IsAdminUser]
    @action(detail=True, methods=["patch"])
    def update_status(self, request, pk=None):
        ticket = self.get_object()

        # Cycle the status
        if ticket.status == "open":
            ticket.status = "in_progress"
        elif ticket.status == "in_progress":
            ticket.status = "closed"
        else:
            ticket.status = "open"

        ticket.save()
        return Response({"message": "Status updated", "status": ticket.status})
    
    
# @api_view(["GET"])
# @permission_classes([IsAdminUser])
# def admin_dashboard(request):
#     total_user = User.objects.count()
#     total_products = Product.objects.count()
#     total_order = Order.objects.count()
#     total_reviews = Review.objects.count()
    
#     last_6_months = (
#         Order.objects.annotate(month=TruncMonth("created_at"))
#         .values("month")
#         .annotate(count=Count("id"))
#         .order_by("month")
#     )
#     new_users = (
#         User.objects.annotate(month=TruncMonth("date_joined"))
#         .values("month")
#         .annotate(count=Count("id"))
#         .order_by("month")
#     )
#     return Response({
#         "total_users":total_user,
#         "total_products":total_products,
#         "total_orders":total_order,
#         "total_reviews":total_reviews,
#         "monthly_orders":last_6_months,
#         "monthly_new_users":new_users,
#     })


@api_view(["GET"])
@permission_classes([IsAdminUser])
def admin_dashboard(request):
    total_users = User.objects.count()
    total_products = Product.objects.count()
    total_orders = Order.objects.count()
    total_reviews = Review.objects.count()

    today = now().date()
    six_months_ago = today - timedelta(days=180)

    monthly_orders = (
        Order.objects.filter(created_at__date__gte=six_months_ago)
        .annotate(month=TruncMonth("created_at"))
        .values("month")
        .annotate(count=Count("id"))
        .order_by("month")
    )

    monthly_users = (
        User.objects.filter(date_joined__date__gte=six_months_ago)
        .annotate(month=TruncMonth("date_joined"))
        .values("month")
        .annotate(count=Count("id"))
        .order_by("month")
    )

    recent_orders_queryset = (
        Order.objects.all()
        .order_by("-created_at")[:10]
    )

    recent_orders = []
    for o in recent_orders_queryset:
        recent_orders.append({
            "id": o.id,
            "user": o.user.username,
            "total_amount": o.total_amount,
            "status": o.status,
            "created_at": o.created_at,
        })

    month_labels = [
        (today - timedelta(days=30 * i)).strftime("%b %Y")
        for i in reversed(range(6))
    ]

    order_map = {item["month"].strftime("%b %Y"): item["count"] for item in monthly_orders}
    user_map = {item["month"].strftime("%b %Y"): item["count"] for item in monthly_users}

    monthly_order_counts = [order_map.get(label, 0) for label in month_labels]
    monthly_user_counts = [user_map.get(label, 0) for label in month_labels]

    return Response({
        "total_users": total_users,
        "total_products": total_products,
        "total_orders": total_orders,
        "total_reviews": total_reviews,

        "chart_data": {
            "months": month_labels,
            "order_counts": monthly_order_counts,
            "user_counts": monthly_user_counts,
        },

        "recent_orders": recent_orders
    })