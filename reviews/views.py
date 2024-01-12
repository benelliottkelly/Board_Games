from .models import Review
from .serializers.common import ReviewSerializer
from lib.views import OwnerListCreateView
from lib.permissions import IsOwnerOrReadOnly
from rest_framework.generics import DestroyAPIView

# Path: /reviews/
# Methods: GET, POST
class ReviewCreateView(OwnerListCreateView):
  queryset = Review.objects.all()
  serializer_class = ReviewSerializer

# Path: /reviews/:pk/
# Methods: DELETE
class ReviewDestroyView(DestroyAPIView):
  queryset = Review.objects.all()
  serializer_class = ReviewSerializer
  permission_classes = [IsOwnerOrReadOnly]