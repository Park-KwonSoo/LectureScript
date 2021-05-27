from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer) :
    class Meta :
        model = User
        fields = '__all__'

class RegisterSerializer(serializers.ModelSerializer) :
    class Meta :
        model = User
        fields = ['email', 'password']

    def save(self, request) :
        user = User.objects.create_user(
            request.data['email'],
            request.data['name'],
            request.data['password']
        )
        return user