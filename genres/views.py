from .models import Genre
from .serializers.common import GenreSerializer
from .serializers.populated import PopulatedGenreSerializer
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

# Path: /genres/
# Methods: GET, POST
class GenreListCreateView(ListCreateAPIView):
  queryset = Genre.objects.all()
  serializer_class = GenreSerializer

# Path: /genres/:pk/
# Methods: GET, PUT, PATCH, DELETE
class GenreDetailView(RetrieveUpdateDestroyAPIView):
  queryset = Genre.objects.all()

  def get_serializer_class(self):
    if self.request.method == 'GET':
      return PopulatedGenreSerializer
    return GenreSerializer