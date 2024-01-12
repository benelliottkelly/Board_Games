from django.urls import path
from .views import ReviewCreateView, ReviewDestroyView

urlpatterns = [
  path('', ReviewCreateView.as_view()), # /api/reviews/
  path('<int:pk>/', ReviewDestroyView.as_view()) # /api/reviews/pk/
]