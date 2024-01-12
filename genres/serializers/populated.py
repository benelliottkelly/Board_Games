from .common import GenreSerializer
from board_games.serializers.common import BoardGameSerializer

class PopulatedGenreSerializer(GenreSerializer):
  board_games = BoardGameSerializer(many=True)