from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
  # picture = models.ImageField(upload_to='./images/', default='/images/meeple.jpg', blank=True)
  bio = models.TextField(max_length=3000, blank=True, null=True)
  # games_owned = models.ManyToManyField(
  #   'games_owned.GameOwned', 
  #   through='BoardGame',
  #   ),
  # outgoing_trades = models.ManyToManyField(
  #   to='trades.Trade',
  #   related_name='trade_origin'
  # ),
  # incoming_trades = models.ManyToManyField(
  #   to='trades.Trade',
  #   related_name='trade_destination'
  # ),
  # reviews = models.ManyToManyField(
  #   to='reviews.Review',
  #   related_name='reviewer'
  # )
  