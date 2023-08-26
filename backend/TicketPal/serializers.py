from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Ticket


class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = ('id', 'name', 'location', 'date', 'vendor', 'phone', 'maxBidder', 'bidders', 'curMaxBid')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')