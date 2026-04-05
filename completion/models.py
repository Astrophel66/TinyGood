from django.db import models
from account.models import User
from dailyact.models import DailyAct
# Create your models here.
class Completion(models.Model):
    user=models.ForeignKey(User, on_delete=models.CASCADE)
    act=models.ForeignKey(DailyAct, on_delete=models.CASCADE)
    date=models.DateTimeField(auto_now_add=True)
    
    
    def __str__(self):
        return self.user