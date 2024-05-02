from django.urls import path

from . import views


urlpatterns = [
    path("", views.log, name="log"),
    path('sign_up/', views.sign_up, name='sign_up'),
    path('sign_in/', views.sign_in, name='sign_in'),
    path('home/', views.home, name='home'),
]