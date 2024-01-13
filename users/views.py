from .serializers.common import RegistrationSerializer
from rest_framework.generics import CreateAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView
from django.contrib.auth import get_user_model
from .serializers.common import UserSerializer
from .serializers.populated import PopulatedUserSerializer
# from lib.permissions import IsOwnerOrReadOnly, IsUserProfileOrReadOnly

User = get_user_model()

# Path: /auth/register/
# Method GET, POST
class RegisterView(CreateAPIView):
  queryset = User.objects.all()
  serializer_class = RegistrationSerializer

# Path: /users/
# Method GET
class UserListCreateView(ListCreateAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer

# Path: /users/:pk
# Method GET
class UserDetailView(ListCreateAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer

  def get_serializer_class(self):
    if self.request.method == 'GET':
      return PopulatedUserSerializer
    return UserSerializer