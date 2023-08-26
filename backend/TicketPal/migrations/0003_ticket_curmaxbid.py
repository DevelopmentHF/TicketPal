# Generated by Django 4.2.4 on 2023-08-26 06:12

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("TicketPal", "0002_ticket_bidders_ticket_maxbidder_alter_ticket_vendor"),
    ]

    operations = [
        migrations.AddField(
            model_name="ticket",
            name="curMaxBid",
            field=models.IntegerField(
                default=0,
                validators=[
                    django.core.validators.MinValueValidator(0),
                    django.core.validators.MaxValueValidator(1000),
                ],
            ),
        ),
    ]
