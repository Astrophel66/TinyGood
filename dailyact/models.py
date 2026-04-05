from django.db import models

# Create your models here.
class DailyAct(models.Model):
    act =models.CharField(max_length = 100)
    date=models.DateField(unique=True)
    
    
    def __str__(self):
        return self.act