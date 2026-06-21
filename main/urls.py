from django.urls import path, re_path
from . import views

urlpatterns = [
    path('api/contact/', views.contact_api, name='contact_api'),
    re_path(r'^.*$', views.frontend, name='frontend'),
]