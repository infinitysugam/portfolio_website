"""
URL configuration for graphrag app
"""
from django.urls import path
from . import views

app_name = 'graphrag'

urlpatterns = [
    path('', views.index, name='index'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('api/run-forecast/', views.run_forecast, name='run_forecast'),
]
