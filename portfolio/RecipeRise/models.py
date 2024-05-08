from django.db import models
from django.contrib.auth.models import User



class Users(models.Model):
    user_name = models.CharField(max_length=200)
    email = models.EmailField(max_length=200)
    password = models.CharField(max_length=200)

class Recipe(models.Model):
    user_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    recipe_name = models.CharField(max_length=200)
    recipe_id = models.CharField(max_length=200)
