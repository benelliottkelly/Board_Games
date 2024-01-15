from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
  image = models.CharField(max_length=500, default='https://res.cloudinary.com/dqk3feale/image/upload/v1705318511/board-games/meeple_cblty1.jpg', blank=True)
  bio = models.TextField(max_length=3000, blank=True, null=True)
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