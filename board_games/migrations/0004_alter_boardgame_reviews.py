# Generated by Django 5.0.1 on 2024-01-15 22:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('board_games', '0003_alter_boardgame_reviews'),
        ('reviews', '0006_alter_review_likes'),
    ]

    operations = [
        migrations.AlterField(
            model_name='boardgame',
            name='reviews',
            field=models.ManyToManyField(blank=True, related_name='game_name', to='reviews.review'),
        ),
    ]
