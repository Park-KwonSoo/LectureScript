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