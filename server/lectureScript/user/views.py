# from rest_framework import status
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework.permissions import AllowAny
# from rest_framework.decorators import permission_classes
# from .models import User

# from .serializers import UserSerializer

# @permission_classes([AllowAny])
# class RegisterView(APIView) :
#     def post(self, request) :
#         serializer = UserRegisterSerializer(data = request.data)
#         if serializer.is_valid(raise_exception = True) :
#             serializer.save()
#             return Response(UserInfoSerializer(serializer.data).data, status = status.HTTP_201_CREATED)


# @permission_classes([AllowAny])
# class LoginView(APIView) :
#     def post(self, request) :
#         serializer = UserLoginSerializer(data = request.data)

#         if not serializer.is_valid(raise_exception = True) :
#             return Response({
#                 'message' : 'Request Body Error'
#             }, status = status.HTTP_400_BAD_REQUEST)
     
#         response = {
#             'success' : True,
#             'token' : serializer.data['token']
#         }

#         return Response(response, status = status.HTTP_200_OK)

# class UserInfoView(APIView) :
#     def get(self, request) :
#         email = request.user
#         query = User.objects.get(email = email)

#         serializer = UserInfoSerializer(query)

#         return Response(serializer.data, status = status.HTTP_200_OK)

# class LogoutView(APIView) :
#     def post(self, request) :
#         token = request.auth
#         print(token)

#         return Response("logout", status = status.HTTP_200_OK)


# # Create your views here.
