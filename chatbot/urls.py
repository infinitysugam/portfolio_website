from django.urls import path
from . import views

app_name = 'chatbot'

urlpatterns = [
    path('chat/', views.chat, name='chat'),
    path('tts/', views.text_to_speech, name='text_to_speech'),
]
