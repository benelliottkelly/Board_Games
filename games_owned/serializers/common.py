from rest_framework import serializers
from ..models import GameOwned

class GameOwnedSerializer(serializers.ModelSerializer):
  class Meta:
    model = GameOwned
    fields = '__all__'