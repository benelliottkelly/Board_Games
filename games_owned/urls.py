from django.urls import path
from .views import GameOwnedListCreateView, GameOwnedDetailView

urlpatterns = [
  path('', GameOwnedListCreateView.as_view()), # /api/gamesowned/
  path('<int:pk>/', GameOwnedDetailView.as_view()) # api/gamesowned/:pk/
]