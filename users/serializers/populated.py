from .common import UserSerializer
from games_owned.serializers.common import GameOwnedSerializer
# Add outgoing trades
# Add incoming trades
from reviews.serializers.common import ReviewSerializer

class PopulatedUserSerializer(UserSerializer):
  reviews = ReviewSerializer(many=True)
  games_owned = GameOwnedSerializer
