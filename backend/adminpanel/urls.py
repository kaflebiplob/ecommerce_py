from rest_framework.routers import DefaultRouter
from .views import OrderAdminViewSet, ProductAdminViewSet, CategoryAdminViewSet

router = DefaultRouter()
router.register(r"products",ProductAdminViewSet, basename='admin-products')
router.register(r"orders",OrderAdminViewSet,basename='admin-orders') 
router.register(r"category", CategoryAdminViewSet, basename='admin-category')



urlpatterns = router.urls