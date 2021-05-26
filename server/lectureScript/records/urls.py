from django.urls import path
from .views import RecordingView, GetRecordView

urlpatterns = [
    path('recording/', RecordingView.as_view(), name = "recording"),
    path('recording/<int:record_id>', GetRecordView.as_view(), name = 'getRecording')
]
