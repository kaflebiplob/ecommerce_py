from django.shortcuts import render
from .models import Discount
from .serializers import DiscountSerializer
from rest_framework import viewsets,permissions

# Create your views here.

class DiscountViewSet(viewsets.ModelViewSet):
    queryset = Discount.objects.all()
    serializer_class = DiscountSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
