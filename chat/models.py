from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Ai_model(models.Model):
    author = models.ForeignKey(User,on_delete=models.CASCADE)
    model_name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=255,unique=True)
    model_file = models.FileField(upload_to='Model_files')
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.model_name
    
class Rooms(models.Model):
    author = models.ForeignKey(User,on_delete=models.CASCADE)
    model_name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=255,unique=True)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.model_name
    
    