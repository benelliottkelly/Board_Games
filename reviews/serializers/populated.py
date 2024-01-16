from .common import ReviewSerializer
from users.serializers.common import UserSerializer
# from users.serializers.populated import PopulatedUserSerializer
from board_games.serializers.common import BoardGameSerializer
# from board_games.serializers.populated import PopulatedBoardGameSerializer

class PopulatedReviewSerializer(ReviewSerializer):
  board_game = BoardGameSerializer()
  created_by = UserSerializer()
  # games_reviewed = BoardGameSerializer(many=True)
  likes = UserSerializer(many=True)