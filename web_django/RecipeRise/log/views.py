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
     # Make a GET request to the Spoonacular API to fetch recipes
    response = requests.get('https://api.spoonacular.com/recipes/random?number=10&apiKey=5aadec4c06d548298be16668bc8a2cc1')

    # Check if the request was successful
    if response.status_code == 200:
        # Parse the JSON response
        recipes = response.json()['recipes']
        return render(request, 'log/one_page.html', {'recipes': recipes})
    else:
        # Handle error response
        return HttpResponse(f"An error occurs: {response.status_code}")