from django.shortcuts import render
from .serializers import RegisterSerializer,CustomTokenObtainPairSerializer
from rest_framework import generics, viewsets
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenObtainPairView
# Create your views here.

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer


class UserListView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
        