from django.db import models

# Create your models here.
class GameOwned(models.Model):
  game = models.ForeignKey(
    to='board_games.BoardGame',
    on_delete=models.CASCADE,
    related_name='games',
  )
  game_owner = models.ForeignKey(
    to='users.User',
    on_delete=models.CASCADE,
    related_name='games',
  )
  quantity = models.PositiveIntegerField()