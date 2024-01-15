from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator 

# Create your models here.
class Review(models.Model):
  created_by = models.ForeignKey(
        to='users.User',
    on_delete=models.CASCADE,
    related_name='reviews',
    null=True
  )
  title = models.CharField(max_length=255)
  rating = models.PositiveSmallIntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
  text = models.TextField(max_length=3000)
  date_added = models.DateTimeField(auto_now=True)
  likes = models.ManyToManyField(
    to='users.User',
    related_name='ratings_liked',
    blank=True
  )

  def __str__(self):
    return f'{self.title} ({self.rating}/5) - {self.created_by}'