from .models import Review
from .serializers.common import ReviewSerializer
from .serializers.populated import PopulatedReviewSerializer
from lib.views import OwnerListCreateView
from lib.permissions import IsOwnerOrReadOnly
from rest_framework.generics import UpdateAPIView, DestroyAPIView
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response

# Path: /reviews/
# Methods: GET, POST
class ReviewCreateView(OwnerListCreateView):
  queryset = Review.objects.all()
  serializer_class = ReviewSerializer
  permission_classes = [IsAuthenticatedOrReadOnly]

# Path: /reviews/:pk/
# Methods: PUT, PATCH
class ReviewLikeView(UpdateAPIView):
  queryset = Review.objects.all()
  serializer_class = PopulatedReviewSerializer
  permission_classes = [IsAuthenticated]

  def patch(self, request, *args, **kwargs):
    review = self.get_object()
    if request.user in review.likes.all():
      # If user has liked review remove user from list of likes
      review.likes.remove(request.user)
      review.save()
      return Response(status=204)
    else:
      # If user hasn't liked review add user to list of likes
      review.likes.add(request.user)
      review.save()
      return Response(status=201)

# Path: /reviews/:pk/
# Methods: DELETE
class ReviewDestroyView(DestroyAPIView):
  queryset = Review.objects.all()
  serializer_class = ReviewSerializer
  permission_classes = [IsOwnerOrReadOnly]