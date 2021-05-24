from django.utils import timezone
from rest_framework import serializers
from .models import Recording

class RecordingSerializer(serializers.ModelSerializer) :
    class Meta :
        model = Recording
        fields = ['name', 'recordFile']