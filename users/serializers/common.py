from rest_framework import serializers
from django.contrib.auth import get_user_model
from ..models import User

User = get_user_model()

class RegistrationSerializer(serializers.ModelSerializer):
  password = serializers.CharField(write_only=True)
  password_confirmation = serializers.CharField(write_only=True)
  
  class Meta:
    model = User
    fields = '__all__'
    extra_fields = ['password_confirmation']

  def validate(self, data):
    print('DATA -> ', data)
    password = data.get('password')
    password_confirmation = data.pop('password_confirmation')
    # If password and password confirmation don't match throw a validation error
    if password != password_confirmation:
      raise serializers.ValidationError('Passwords do not match.')
    # Else validate and return the data, with the password_confirmation excluded
    return data
  
  # create_user to hash the password
  def create(self, validated_data):
    user = User.objects.create_user(**validated_data)
    return user
  
class UserSerializer(serializers.ModelSerializer):
  # password = serializers.CharField(write_only=True)
  # password_confirmation = serializers.CharField(write_only=True)

  class Meta:
    model = User
    fields = (
      'pk',
      'first_name',
      'last_name',
      'username', 
      'image', 
      'bio', 
      'games_owned', 
      'reviews',
      )