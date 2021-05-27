from django.db import models
from django.utils import timezone

class Recording(models.Model) :
    email = models.EmailField(max_length = 200)
    title = models.CharField(max_length = 50)
    createdDate = models.DateTimeField(default = timezone.now)
    professor = models.CharField(max_length = 20, default = None)
    typeScript = models.TextField(default = None, null = True, blank = True)

    def __str__(self) : 
        return self.title

    def isAuthorizedUser(self, email) :
        return self.email == email

    def getCreatedDate(self) :
        return self.createdDate

    def getTypeScript(self) :
        return self.typeScript

    
# Create your models here.
