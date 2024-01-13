from .common import UserSerializer
from games_owned.serializers.common import GameOwnedSerializer
from board_games.serializers.common import BoardGameSerializer
# Add outgoing trades
# Add incoming trades
from reviews.serializers.common import ReviewSerializer

class PopulatedUserSerializer(UserSerializer):
  reviews = ReviewSerializer(many=True)
  games_owned = BoardGameSerializer
