from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from django.contrib.auth.models import User


class Ticket(models.Model):
    name = models.CharField(max_length=120)
    location = models.CharField(max_length=120)
    date = models.DateTimeField()
    bidders = models.ManyToManyField(User, related_name='tickets_as_bidders')  # Specify a related_name
    maxBidder = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='tickets_as_max_bidder')  # Specify a related_name
    vendor = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="tickets_as_vendor")
    phone = models.CharField(max_length=12)
    curMaxBid = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(1000)], default=0)

    def __str__(self):
        return self.name
