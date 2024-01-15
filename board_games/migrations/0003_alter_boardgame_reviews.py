# Generated by Django 5.0.1 on 2024-01-15 09:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('board_games', '0002_initial'),
        ('reviews', '0003_review_likes'),
    ]

    operations = [
        migrations.AlterField(
            model_name='boardgame',
            name='reviews',
            field=models.ManyToManyField(blank=True, related_name='board_games', to='reviews.review'),
        ),
    ]