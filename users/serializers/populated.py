from .common import UserSerializer
from games_owned.serializers.common import GameOwnedSerializer
from games_owned.serializers.populated import PopulatedGameOwnedSerializer
# from board_games.serializers.common import BoardGameSerializer
# Add outgoing trades
# Add incoming trades
from reviews.serializers.common import ReviewSerializer
from reviews.serializers.populated import PopulatedReviewSerializer

class PopulatedUserSerializer(UserSerializer):  
  reviews = PopulatedReviewSerializer(many=True)
  games = PopulatedGameOwnedSerializer(many=True)
