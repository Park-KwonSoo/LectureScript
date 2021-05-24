import re
from rest_framework import serializers
from .models import Recording

class RecordingSerializer(serializers.ModelSerializer) :
    class Meta :
        model = Recording
        fields = '__all__'

    def create(self, validated_data) :
        recording = Recording.objects.create(**validated_data)
        return recording