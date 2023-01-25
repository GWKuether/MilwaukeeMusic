from django.db import models
from authentication.models import User

# Create your models here.

class Event(models.Model):
    title = models.CharField(max_length=500)
    date = models.DateField(null=True, default=None)
    venue = models.CharField(max_length=255)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
