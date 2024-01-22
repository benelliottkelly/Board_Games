from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsOwnerOrReadOnly(BasePermission):
  def has_object_permission(self, request, view, obj):
    if request.method in SAFE_METHODS:
      return True
    else:
      return request.user == obj.created_by

class IsUserProfileOrReadOnly(BasePermission):
  def has_object_permission(self, request, view, obj):
    if request.method in SAFE_METHODS:
      return True
    else:
      return request.user == obj.pk