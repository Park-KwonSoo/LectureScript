from django.contrib.auth import authenticate, get_user_model
from rest_framework_jwt.settings import api_settings
from rest_framework import serializers
from .models import User

JWT_PAYLOAD_HANDLER = api_settings.JWT_PAYLOAD_HANDLER
JWT_ENCODE_HANDLER = api_settings.JWT_ENCODE_HANDLER

class UserInfoSerializer(serializers.ModelSerializer) :
    class Meta :
        model = User
        fields = ['email', 'name', 'date_joined']

class UserRegisterSerializer(serializers.ModelSerializer) :
    email = serializers.EmailField(required = True)
    name = serializers.CharField(required = True)
    password = serializers.CharField(required = True)

    class Meta :
        model = User
        fields = '__all__'

    def create(self, validated_data) :
        user = User.objects.create_user(
            email = validated_data['email'],
            name = validated_data['name'],
            password = validated_data['password']
        )

        return user

class UserLoginSerializer(serializers.ModelSerializer) :
    email = serializers.EmailField(required = True)
    password = serializers.CharField(required = True, write_only = True)
    token = serializers.CharField(max_length = 255, read_only = True)

    class Meta :
        model = User
        exclude = ['name']

    def validate(self, data) :
        email = data.get('email', None)
        password = data.get('password', None)
        user = authenticate(email = email, password = password)

        if user is None :
            return {
                'email' : None
            }

        try :
            payload = JWT_PAYLOAD_HANDLER(user)
            jwt_token = JWT_ENCODE_HANDLER(payload)
            
            return {
                'email' : user.email,
                'token' : jwt_token
            }

        except User.DoesNotExist :
            raise serializers.ValidationError(
                'User does not exist'
            )

        