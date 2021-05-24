from django.db import models

class Pdf(models.Model) :
    email = models.CharField(max_length = 50)
    records = models.ForeignKey("records.Recording", on_delete = models.DO_NOTHING)

    def __str__(self) :
        return self.records

# Create your models here.
