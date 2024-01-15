from .common import ReviewSerializer
from users.serializers.common import UserSerializer
from board_games.serializers.common import BoardGameSerializer
from board_games.serializers.populated import PopulatedBoardGameSerializer

class PopulatedReviewSerializer(ReviewSerializer):
  created_by = UserSerializer()
  game_name = BoardGameSerializer(many=True)
  likes = UserSerializer(many=True)