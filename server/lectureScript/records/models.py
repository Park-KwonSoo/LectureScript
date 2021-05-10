from django.db import models
from django.contrib.auth.models import User
import datetime
from django.utils import timezone

class Lecture(models.Model) :
    lecture_title = models.CharField(max_length = 50, blank = False)
    lecture_info = models.TextField()
    lecture_professor = models.CharField(max_length = 20, blank = False)
    lecture_pub_date = models.DateTimeField("default datetime")

class Script(models.Model) :
    userId = models.ForeignKey(User, on_delete = models.CASCADE)
    script_title = models.OneToOneField(Lecture, on_delete = models.DO_NOTHING)
    script_pub_date = models.DateTimeField("default datetime")


# Create your models here.
