from django.http import HttpResponse
from django.shortcuts import render

import requests


def index(request):
    return render(request, 'log/index.html')


def sign_up(request):
    return render(request, 'log/sign_up.html')


def sign_in(request):
    return render(request, 'log/sign_in.html')


def one_page(request):
    if "recipes" not in request.session:
        response = requests.get('https://api.spoonacular.com/recipes/random?number=30&apiKey=5aadec4c06d548298be16668bc8a2cc1')
        if response.status_code == 200:
            recipes = response.json()['recipes']
            request.session["recipes"] = recipes
        else:
            return HttpResponse(f"An error occurs: {response.status_code}")
    
    return render(request, 'log/one_page.html', {'recipes': request.session["recipes"]})
