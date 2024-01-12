from .common import GameOwnedSerializer
from users.serializers.common import UserSerializer
from board_games.serializers.common import BoardGameSerializer

class PopulatedGameOwnedSerializer(GameOwnedSerializer):
  name = BoardGameSerializer
  owner = UserSerializer