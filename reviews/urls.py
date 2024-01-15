from django.urls import path
from .views import ReviewCreateView, ReviewLikeView, ReviewDestroyView

urlpatterns = [
  path('', ReviewCreateView.as_view()), # /api/reviews/
  path('<int:pk>/', ReviewLikeView.as_view()),
  path('<int:pk>/', ReviewDestroyView.as_view()) # /api/reviews/pk/
]