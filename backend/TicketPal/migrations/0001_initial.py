# Generated by Django 4.2.4 on 2023-08-26 06:28

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Ticket",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=120)),
                ("location", models.CharField(max_length=120)),
                ("date", models.DateTimeField()),
                ("expiry", models.DateTimeField(auto_now_add=True)),
                ("phone", models.CharField(max_length=12)),
                (
                    "curMaxBid",
                    models.IntegerField(
                        default=0,
                        validators=[
                            django.core.validators.MinValueValidator(0),
                            django.core.validators.MaxValueValidator(1000),
                        ],
                    ),
                ),
                (
                    "bidders",
                    models.ManyToManyField(
                        related_name="tickets_as_bidders", to=settings.AUTH_USER_MODEL
                    ),
                ),
                (
                    "maxBidder",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="tickets_as_max_bidder",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "vendor",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="tickets_as_vendor",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
    ]
