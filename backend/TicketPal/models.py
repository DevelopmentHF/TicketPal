from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Ticket(models.Model):
    name = models.CharField(max_length=120)
    location = models.CharField(max_length=120)
    date = models.DateTimeField()
    vendor = models.ForeignKey(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=12)

    def _str_(self):
        return self.name
