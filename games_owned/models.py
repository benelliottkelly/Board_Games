from django.db import models

# Create your models here.
class GameOwned(models.Model):
  game = models.ForeignKey(
    to='board_games.BoardGame',
    on_delete=models.PROTECT,
    # related_name='owned_game',
    null=True
  )
  game_owner = models.ForeignKey(
    to='users.User',
    on_delete=models.PROTECT,
    related_name='game_owned',
    null=True
  )
  quantity = models.PositiveIntegerField()