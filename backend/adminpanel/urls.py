from rest_framework.routers import DefaultRouter
from .views import OrderAdminViewSet, ProductAdminViewSet, CategoryAdminViewSet, ReviewAdminViewSet,DiscountAdminViewSet,PaymentAdminViewSet,CartAdminViewSet,AddressAdminViewSet,UserAdminViewSet,SupportAdminViewSet

router = DefaultRouter()
router.register(r"products",ProductAdminViewSet, basename='admin-products')
router.register(r"orders",OrderAdminViewSet,basename='admin-orders') 
router.register(r"category", CategoryAdminViewSet, basename='admin-categories')
router.register(r"reviews", ReviewAdminViewSet, basename='admin-reviews')
router.register(r"discounts", DiscountAdminViewSet, basename='admin-discounts')
router.register(r"payments", PaymentAdminViewSet, basename='admin-payments')
router.register(r"address", AddressAdminViewSet, basename='admin-address')
router.register(r"users", UserAdminViewSet, basename='admin-users')
router.register(r"cart", CartAdminViewSet, basename='admin-cart')
router.register(r"support", SupportAdminViewSet, basename='admin-support')



urlpatterns = router.urls