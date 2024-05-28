from .forms import RegistrationForm
from .functions import getRecipes
from .models import Recipes

from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.contrib.auth import logout, login, authenticate
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.urls import reverse

import json



def index(request):
    return render(request, 'index.html')


def sign_up(request):
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password1']
            user = User.objects.create_user(username=username, password=password)
            login(request, user)
            return redirect(reverse('home'))
        
        return render(request, 'sign_up.html', {'form': form})
    
    form = RegistrationForm()
    return render(request, 'sign_up.html', {'form': form})


def sign_in(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, request.POST)

        if form.is_valid():
            username = request.POST['username']
            password = request.POST['password']
            user = authenticate(request, username=username, password=password)

            if user is not None:
                login(request, user)
                return redirect(reverse('home'))
 
        return render(request, 'sign_in.html', {'form': form})
    
    form = AuthenticationForm()
    return render(request, 'sign_in.html', {'form': form})


def home(request):
    return render(request, 'home.html')


def recipes(request):
    return render(request, 'recipes.html')


@login_required
def profile(request):
    user = request.user
    username = user.username
    recipes = Recipes.objects.all().filter(user_id=user.id)
    return render(request, 'profile.html', {'username': username, 'recipes': recipes})


@login_required
def saveRecipe(request):
    if request.method == 'POST':
        print('hello world')
        userId = request.user.id
        recipeId = request.POST['recipeId']
        recipeTitle = request.POST['recipeTitle']
        user = User.objects.get(pk=userId)
        Recipes.objects.create(recipe_name=recipeTitle, recipe_id=recipeId, user=user)
    return JsonResponse({'message': 'the operation was successful'}, status=200)



def about(request):
    return render(request, 'about.html')


def contact(request):
    return render(request, 'contact.html')

