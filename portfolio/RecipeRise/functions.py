import requests


API_key = "5aadec4c06d548298be16668bc8a2cc1"


def getRecipes(key="cuisine", value='italian', number=10):
    """ Get recipes using filtering mechanism"""
    domain = "https://api.spoonacular.com/recipes/complexSearch?"
    url = f"{domain}{key}={value}&number={number}&apiKey={API_key}"
    response = requests.get(url)

    if response.status_code == 200:
        recipes = response.json()['results']
        return recipes

    return False