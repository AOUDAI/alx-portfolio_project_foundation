from django.db import models
from django.contrib.auth.models import User


class Recipes(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    recipe_name = models.CharField(max_length=200)
    recipe_id = models.CharField(max_length=200)


class reviews(models.Model):
    review = models.CharField(max_length=500)
    recipe_id = models.ForeignKey(Recipes, on_delete=models.CASCADE)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)