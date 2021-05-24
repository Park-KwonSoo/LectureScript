from django.db import models
from django.utils import timezone

class Recording(models.Model) :
    name = models.CharField(max_length = 50)
    createdDate = models.DateTimeField(default = timezone.now)
    recordFile = models.FileField(upload_to = 'file', null = True)
    user = models.ForeignKey("user.User", on_delete = models.DO_NOTHING, db_column = "user_email")

    def __str__(self) :
        return self.name

    
# Create your models here.
