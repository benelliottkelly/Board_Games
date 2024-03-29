from .models import BoardGame
from .serializers.common import BoardGameSerializer
from .serializers.populated import PopulatedBoardGameSerializer
from rest_framework.response import Response
from lib.views import OwnerListCreateView
from lib.permissions import IsOwnerOrReadOnly
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.generics import RetrieveUpdateDestroyAPIView

# Path: /boardgames
# Methods: GET, POST
class BoardGameListCreateView(OwnerListCreateView):
  queryset = BoardGame.objects.all().select_related('created_by').prefetch_related('genre', 'owned_by')
  # serializer_class = PopulatedBoardGameSerializer
  permission_classes = [IsAuthenticatedOrReadOnly]

  def get_serializer_class(self):
    if self.request.method == 'GET':
      return PopulatedBoardGameSerializer
    return BoardGameSerializer

# Path: /boardgames/:pk
# Methods: GET, PUT, PATCH, DELETE
class BoardGameDetailView(RetrieveUpdateDestroyAPIView):
  queryset = BoardGame.objects.all().select_related('created_by').prefetch_related('genre', 'owned_by')
  permission_classes = [IsOwnerOrReadOnly]

  def get_serializer_class(self):
    print('self request method -> ', self.request.method)
    if self.request.method == 'GET':
      return PopulatedBoardGameSerializer
    return BoardGameSerializer