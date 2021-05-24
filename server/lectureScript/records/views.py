from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import RecordingSerializer

class RecordingView(APIView) :
    def post(self, request) :
        serialize = RecordingSerializer(request.data)
        return Response(serialize.data, status = status.HTTP_200_OK)
        

# Create your views here.
