from django.http import HttpResponse
from django.shortcuts import render

import requests


def index(request):
    return render(request, 'log/index.html')


def sign_up(request):
    return render(request, 'log/sign_up.html')


def sign_in(request):
    return render(request, 'log/sign_in.html')
