# Generated by Django 5.0.1 on 2024-01-13 13:31

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('board_games', '0001_initial'),
        ('games_owned', '0001_initial'),
        ('genres', '0001_initial'),
        ('reviews', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='boardgame',
            name='created_by',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='created_games', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='boardgame',
            name='genre',
            field=models.ManyToManyField(related_name='board_games', to='genres.genre'),
        ),
        migrations.AddField(
            model_name='boardgame',
            name='owned_by',
            field=models.ManyToManyField(related_name='games_owned', through='games_owned.GameOwned', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='boardgame',
            name='reviews',
            field=models.ManyToManyField(related_name='board_games', to='reviews.review'),
        ),
    ]
