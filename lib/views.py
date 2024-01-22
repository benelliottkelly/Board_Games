from rest_framework.generics import ListCreateAPIView

# function to attach an owner (created_by) to a given created record
class OwnerListCreateView(ListCreateAPIView):
  def perform_create(self, serializer):
    print('REQUEST USER -> ', self.request.user)
    serializer.save(created_by=self.request.user)