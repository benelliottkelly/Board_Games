from .models import GameOwned
from .serializers.common import GameOwnedSerializer
from .serializers.populated import PopulatedGameOwnedSerializer
from lib.views import OwnerListCreateView
from lib.permissions import IsOwnerOrReadOnly
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.generics import RetrieveUpdateDestroyAPIView

# Path: /gamesowned
# Methods: GET, POST
class GameOwnedListCreateView(OwnerListCreateView):
  queryset = GameOwned.objects.all()
  serializer_class = GameOwnedSerializer
  permission_classes = [IsOwnerOrReadOnly]

# Path: /gamesowned/:pk
# Methods: GET, PUT, PATCH, DELETE
class GameOwnedDetailView(RetrieveUpdateDestroyAPIView):
  queryset = GameOwned.objects.all()
  permission_classes = [IsOwnerOrReadOnly]

  def get_serializer_class(self):
    print('self request method -> ', self.request.method)
    if self.request.method == 'PUT':
      return GameOwnedSerializer
    return PopulatedGameOwnedSerializer
