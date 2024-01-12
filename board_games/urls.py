from django.urls import path
from .views import BoardGameListCreateView, BoardGameDetailView

urlpatterns = [
  path('', BoardGameListCreateView.as_view()), # /api/boardgames/
  path('<int:pk>/', BoardGameDetailView.as_view()) # /api/boardgames/pk/
]