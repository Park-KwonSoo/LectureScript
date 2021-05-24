from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import PdfSerializers

class PdfView(APIView) :
    def get(self, request) :
        return Response('get', status = status.HTTP_200_OK)

    def post(self, request) :
        return Response('post', status = status.HTTP_200_OK)



# Create your views here.
