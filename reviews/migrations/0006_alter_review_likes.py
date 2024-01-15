# Generated by Django 5.0.1 on 2024-01-15 22:31

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reviews', '0005_alter_review_likes'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterField(
            model_name='review',
            name='likes',
            field=models.ManyToManyField(blank=True, related_name='ratings_liked', to=settings.AUTH_USER_MODEL),
        ),
    ]