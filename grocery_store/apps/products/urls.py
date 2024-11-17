# apps/products/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, ProductViewSet

router = DefaultRouter()
router.register('categories', CategoryViewSet)
router.register('', ProductViewSet)

urlpatterns = [
    path('', include(router.urls)),
]