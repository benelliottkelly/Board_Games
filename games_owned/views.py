from .models import GameOwned
from .serializers.common import GameOwnedSerializer
from .serializers.populated import PopulatedGameOwnedSerializer
from lib.views import OwnerListCreateView
from lib.permissions import IsOwnerOrReadOnly
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView

# Path: /gamesowned
# Methods: GET, POST
class GameOwnedListCreateView(ListCreateAPIView):
  queryset = GameOwned.objects.all().select_related('game', 'game_owner')
  serializer_class = GameOwnedSerializer
  permission_classes = [IsOwnerOrReadOnly]



# Path: /gamesowned/:pk
# Methods: GET, PUT, PATCH, DELETE
class GameOwnedDetailView(RetrieveUpdateDestroyAPIView):
  queryset = GameOwned.objects.all().select_related('game', 'game_owner')
  permission_classes = [IsOwnerOrReadOnly]

  def get_serializer_class(self):
    print('self request method -> ', self.request.method)
    if self.request.method == 'PUT':
      return GameOwnedSerializer
    return PopulatedGameOwnedSerializer
