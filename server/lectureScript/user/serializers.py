from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer) :
    class Meta :
        model = User
        fields = ['email', 'name', 'date_joined']

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