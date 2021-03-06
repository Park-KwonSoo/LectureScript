# Create your models here.
from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
from django.utils import timezone

class UserManager(BaseUserManager) :
    def create_user(self, email, name, password) :
        if not email :
            raise ValueError("User must have an Email")

        user = self.model(
            email = self.normalize_email(email),
            name = name
        )

        user.set_password(password)
        user.save(using = self._db)
        return user
    
    def create_superuser(self, email, name, password) :
        superuser = self.create_user(email, name, password = password)
        superuser.is_admin = True
        superuser.save(using = self._db)
        return superuser


class User(AbstractBaseUser) :
    email = models.EmailField(unique = True)
    name = models.CharField(max_length = 20)
    is_active = models.BooleanField(default = True)
    is_admin = models.BooleanField(default = False)
    date_joined = models.DateTimeField(default = timezone.now)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = [ 'name' ]

    def __str__(self) :
        return self.email

    def has_perm(self, perm, obj = None) :
        return True

    def has_module_perms(self, app_label) :
        return True

    def is_staff(self) :
        return self.is_admin