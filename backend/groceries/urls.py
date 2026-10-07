from django.urls import path
from .views import product_list, ProductListAPIView, ProductDetailAPIView

urlpatterns = [
    path('products/', product_list, name='product_list'),
    path('api/products/', ProductListAPIView.as_view(), name='product_list_api'),
    path('api/products/<int:pk>/', ProductDetailAPIView.as_view(), name='product_detail_api'),
]