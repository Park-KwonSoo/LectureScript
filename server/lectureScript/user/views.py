from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserInfoSerializer, UserRegisterSerializer, UserLoginSerializer

class RegisterView(APIView) :
    def post(self, request) :
        serializer = UserRegisterSerializer(data = request.data)
        if serializer.is_valid(raise_exception = True) :
            serializer.save()
            return Response(UserInfoSerializer(serializer.data).data, status = 401)

class LoginView(APIView) :
    def post(self, request) :
        serializer = UserLoginSerializer(data = request.data)
        if not serializer.is_valid(raise_exception = True) :
            return Response({
                'message' : 'Request Body Error'
            }, status = 400)
        
        if serializer.validated_data['email'] == 'None' :
            return Response({
                'message' : 'Need Email'
            }, status = 400)
        
        response = {
            'success' : True,
            'token' : serializer.data['token']
        }

        return Response(response, status = 200)


# Create your views here.
