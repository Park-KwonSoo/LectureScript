from django.urls import path
from .views import RecordingView

urlpatterns = [
    path('recording/', RecordingView.as_view(), name = "recording")
]
