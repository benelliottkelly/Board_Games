from .common import GameOwnedSerializer
from users.serializers.common import UserSerializer
# from users.serializers.populated import PopulatedUserSerializer
from board_games.serializers.common import BoardGameSerializer

class PopulatedGameOwnedSerializer(GameOwnedSerializer):
  game = BoardGameSerializer()
  game_owner = UserSerializer()