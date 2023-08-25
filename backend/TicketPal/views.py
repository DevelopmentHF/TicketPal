from django.shortcuts import render
from rest_framework import viewsets
from .serializers import TicketSerializer, UserSerializer
from .models import Ticket
from django.contrib.auth.models import User

# Create your views here.

class TicketView(viewsets.ModelViewSet):
    serializer_class = TicketSerializer
    queryset = Ticket.objects.all()


class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()