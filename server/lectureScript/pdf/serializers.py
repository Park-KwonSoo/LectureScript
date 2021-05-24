from rest_framework import serializers
from .models import Pdf

class PdfSerializers(serializers.ModelSerializer) :
    class Meta :
        model = Pdf
        field = '__all__'

    def create(self, validated_data) :
        pdf = Pdf.objects.create(**validated_data)
        return pdf