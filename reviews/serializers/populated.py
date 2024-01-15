from .common import ReviewSerializer
from users.serializers.common import UserSerializer

class PopulatedReviewSerializer(ReviewSerializer):
  created_by = UserSerializer
  likes = UserSerializer(many=True)