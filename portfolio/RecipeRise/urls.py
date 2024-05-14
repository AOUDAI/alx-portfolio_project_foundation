from django.urls import path

from . import views


urlpatterns = [
    path("", views.index, name='index'),
    path('sign_up/', views.sign_up, name='sign_up'),
    path('sign_in/', views.sign_in, name='sign_in'),
    path('home/', views.home, name='home'),
    path('recipes/', views.recipes, name='recipes'),
    path('profile/', views.profile, name='profile'),
    path('about/', views.about, name='about'),
    path('contact/', views.contact, name='contact'),
]