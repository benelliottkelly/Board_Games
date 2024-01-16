# Generated by Django 5.0.1 on 2024-01-16 11:23

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('board_games', '0006_remove_boardgame_reviews'),
        ('games_owned', '0002_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='gameowned',
            name='game',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='games', to='board_games.boardgame'),
        ),
    ]
