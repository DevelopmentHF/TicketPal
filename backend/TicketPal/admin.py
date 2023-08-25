from django.contrib import admin
from .models import Ticket


class TicketAdmin(admin.ModelAdmin):
    list_display = ('name', 'location', 'date', 'vendor', 'phone')


# Register your models here.
admin.site.register(Ticket, TicketAdmin)

