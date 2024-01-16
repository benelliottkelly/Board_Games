from .common import BoardGameSerializer
from users.serializers.common import UserSerializer
# from users.serializers.populated import PopulatedUserSerializer
from genres.serializers.common import GenreSerializer
from genres.serializers.populated import PopulatedGenreSerializer
from reviews.serializers.common import ReviewSerializer
from reviews.serializers.populated import PopulatedReviewSerializer
from games_owned.serializers.common import GameOwnedSerializer
from games_owned.serializers.populated import PopulatedGameOwnedSerializer


class PopulatedBoardGameSerializer(BoardGameSerializer):
  genre = PopulatedGenreSerializer(many=True)
  owned_by = UserSerializer(many=True)
  games = PopulatedGameOwnedSerializer(many=True)
  reviews = PopulatedReviewSerializer(many=True)
  created_by = UserSerializer()
