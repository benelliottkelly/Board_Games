from django.db import models
from django.core.validators import MinValueValidator

# Create your models here.
class BoardGame(models.Model):
  title = models.CharField(max_length=255)
  publisher = models.CharField(max_length=255)
  year = models.PositiveSmallIntegerField(validators=[MinValueValidator(100)]) # invalidates entering 99 instead of 1999
  image = models.URLField()
  description = models.TextField(max_length=3000, blank=True, null=True)
  genre = models.ManyToManyField(
    to='genres.Genre',
    related_name='board_games'
  )
  owned_by = models.ManyToManyField(
    to='users.User',
    through='games_owned.GameOwned',
    related_name='games_owned'
  )
  created_by = models.ForeignKey(
    to='users.User',
    on_delete=models.CASCADE,
    related_name='created_games'
  )
  date_added = models.DateTimeField(auto_now_add=True)
  last_edited = models.DateTimeField(auto_now=True)

  def __str__(self):
    return f'{self.title} ({self.year})'