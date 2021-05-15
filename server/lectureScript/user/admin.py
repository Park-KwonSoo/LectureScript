from django import forms
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from django.core.exceptions import ValidationError

from .models import User


class UserCreationForm(forms.ModelForm) :
    password1 = forms.CharField(label = 'Password', widget = forms.PasswordInput)
    password2 = forms.CharField(label = 'Password Check', widget = forms.PasswordInput)

    class Meta :
        model = User
        fields = ('email', 'name', 'password')

    def clean_password2(self) :
        password1 = self.cleaned_data.get('password1')
        password2 = self.cleaned_data.get('password2')

        if password1 and password2 and password1 != password2 :
            raise ValidationError("Password dosen't match")
        
        return password2

    def save(self, commit = True) :
        user = super().save(commit = False)
        user.set_password(self.cleaned_data['password1'])

        if(commit) :
            user.save()
        
        return user


class UserChangeForm(forms.ModelForm) :
    password = ReadOnlyPasswordHashField()

    class Meta :
        model = User
        fields = ['email', 'name', 'is_active', 'is_admin']

    def clean_password(self) :
        return self.initial['password']


class UserAdmin(BaseUserAdmin) :
    form = UserChangeForm
    add_form = UserCreationForm

    list_display = ('email', 'name', 'is_active', 'is_admin')
    list_filter = ('is_admin', 'name')
    add_fieldsets = (
        (None, {'fields' : ('email', 'name', 'password1', 'password2')}),
    )
    fieldsets = (
        ('User', {'fields' : ('email', 'password')}),
        ('Personal Info', {'fields' : ('name', 'date_joined')}),
        ('Permissions', {'fields' : ('is_admin',)})
    )
    search_fields = ('email', 'name')
    ordering = ('date_joined',)
    filter_horizontal = ()


admin.site.register(User, UserAdmin)




# Register your models here.
