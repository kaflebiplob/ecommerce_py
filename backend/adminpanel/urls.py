from rest_framework.routers import DefaultRouter
from .views import OrderAdminViewSet, ProductAdminViewSet

router = DefaultRouter()
router.register(r"products",ProductAdminViewSet, basename='admin-products')
router.register(r"orders",OrderAdminViewSet,basename='admin-orders') 


urlpatterns = router.urls