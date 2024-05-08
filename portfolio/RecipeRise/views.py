from .forms import RegistrationForm
from .functions import getRecipes

from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.contrib.auth import logout, login, authenticate
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, redirect
from django.urls import reverse

import requests



def index(request):
    return render(request, 'index.html')


def sign_up(request):
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        print(form.is_valid())
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
    if "quick" not in request.session:
        quick = getRecipes('maxReady', '5', 12)
        request.session["quick"] = quick

    if "unknown" not in request.session:
        unknown = getRecipes('diet', 'Paleo', 12)
        request.session["unknown"] = unknown

    if 'vegetarian' not in request.session:
        vegetarian = getRecipes('diet', 'Vegetarian', 12)
        request.session["vegetarian"] = vegetarian

    return render(request, 'home.html', {'quick': request.session["quick"],
                                         'unknown':request.session["unknown"],
                                         'vegetarian': request.session["vegetarian"]})


def recipes(request):

    return render(request, 'recipes.html', {'quick': request.session["quick"],
                                         'unknown':request.session["unknown"],
                                         'vegetarian': request.session["vegetarian"]})

