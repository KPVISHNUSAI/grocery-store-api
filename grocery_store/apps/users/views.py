# apps/users/views.py
from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer
from .permissions import IsAdmin

class UserViewSet(viewsets.ModelViewSet):
    queryset=User.objects.all()
    serializer_class=UserSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [IsAdmin()]
        elif self.action in ['update','partial_update', 'destroy']:
            return [IsAdmin()]
        return [IsAuthenticated()]
    
    @action(detail=False, methods=['get'])
    def me(self, request):
        serializer=self.get_serializer(request.user)
        return Response(serializer.data)
