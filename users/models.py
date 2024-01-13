from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
  image = models.CharField(max_length=500, default='./images/meeple.jpg', blank=True)
  bio = models.TextField(max_length=3000, blank=True, null=True)
  # games_owned = models.ManyToManyField(
  #   to='games_owned.GameOwned', 
  #   related_name='game_owner'
  #   through='games_owned.GameOwned',
  #   ),
  # outgoing_trades = models.ManyToManyField(
  #   to='trades.Trade',
  #   related_name='trade_origin'
  # ),
  # incoming_trades = models.ManyToManyField(
  #   to='trades.Trade',
  #   related_name='trade_destination'
  # ),
  
  def __str__(self):
    return f'{self.username} {self.email}'