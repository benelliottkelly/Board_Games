from .common import BoardGameSerializer
from users.serializers.common import UserSerializer
# from users.serializers.common import RegistrationSerializer
from genres.serializers.common import GenreSerializer
from reviews.serializers.common import ReviewSerializer
# from games_owned.serializers.common import GameOwnedSerializer


class PopulatedBoardGameSerializer(BoardGameSerializer):
  genre = GenreSerializer(many=True)
  owned_by = UserSerializer(many=True)
  reviews = ReviewSerializer(many=True)
  created_by = UserSerializer()
