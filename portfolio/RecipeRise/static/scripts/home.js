$(document).ready(function () {
  
  function getRecipes (catagory,  number, type = "", diet = "") {
    route = "https://api.spoonacular.com/recipes/complexSearch";
    apiKey = "5aadec4c06d548298be16668bc8a2cc1";
    filters = `type=${type}&diet=${diet}&&number=${number}&apiKey=${apiKey}`;
    options = "sort=random&addRecipeNutrition=true&addRecipeInstructions=true";

    $.ajax({
      url: `${route}?${filters}&${options}`,
      method: 'GET',
      dataType: 'json',
      success: function (response) {
        sessionStorage.setItem(catagory, JSON.stringify(response.results));
      },
      error: function (xhr, status, error) {
        console.log('Error:', status, error);
        console.log(error);
      }
    });
  };

  function fillContent(category) {
    for (recipe of JSON.parse(sessionStorage.getItem(category))) {
      $(`#${category}`).append(
        `<div class="recipe-card">
          <div class="recipe-img">
            <img src="${recipe.image}" alt="${recipe.title}">
            <a href="#" id="${recipe.id}" class="btn">View Recipe</a>
          </div>
          <div class="recipe-title">
            <h3>${recipe.title}</h3>
          </div>
        </div>`
      );
    };
  };

  if (sessionStorage.getItem('recipes') === null) {
    getRecipes("recipes", 6, type='main course');
  }

  if (sessionStorage.getItem('desserts') === null) {
    getRecipes('desserts', 6, type='dessert');
  }

  if (sessionStorage.getItem('drinks') === null) {
    getRecipes('drinks', 6, type='drink');
  };

  fillContent('recipes');
  fillContent('desserts');
  fillContent('drinks');

  $('.recipe-card .btn').click(function(e) {
    e.preventDefault();
    $('.overlay').addClass('active');
    $('.recipe-content-board').slideDown('medium');
    $('.recipe-content-board').css('display', "flex");
    $('body').addClass('overlay-active');

    const recepeCategory = (($(this).parent()).parent()).parent().prop('id');
    const myId = $(this).prop('id');
    const myRecipe = JSON.parse(sessionStorage.getItem(recepeCategory)).find(function (obj) {
      return obj.id == myId;
    });
  
    const ingredients = myRecipe.nutrition.ingredients.map(function (obj) {
      return obj.name + " " + obj.amount + " " + obj.unit;
    }).join("<br>");

    const instructions = myRecipe.analyzedInstructions[0].steps.map(function (obj) {
      return obj.number + ": " + obj.step;
    }).join("<br>");

    $('.recipe-details').append(
      `<img src="${myRecipe.image}">
      <h2>${myRecipe.title}</h2>
      <h5>serves:${myRecipe.servings}</h5>
      <h4>preparation minutes: ${myRecipe.preparationMinutes}</h4>
      <h4>ready in minutes: ${myRecipe.readyInMinutes}</h4>
      <h6 class="add-item">add to my list</h6>`
    );

    $('.recipe-ingredients').append(
      `<h3>Ingredients:</h3>
      <p>${ingredients}</p>`
    );

    $('.recipe-instructions').append(
      `<h3>Instructions:</h3>
      <p>${instructions}</p>`
    );

    $('.recipe-details').on('click', '.add-item', function () {
      $.ajax({
        url: 'http://localhost:8000/RecipeRise/save/',
        method: 'POST',
        data: {
          recipeTitle: myRecipe.title,
          recipeId: myRecipe.id
        },
        headers: {
          'X-CSRFToken': csrftoken
        },
        success: function () {
          alert('Your recipe has been saved');
        },
        error: function(error) {
          console.log(error);
        }
      });
    });
  
    $('.close-btn').click(function() {
      $('.overlay').removeClass('active');
      $('.recipe-content-board').slideUp('medium');
      $('.recipe-details').empty();
      $('.recipe-ingredients').empty();
      $('.recipe-instructions').empty();
      $('.recipe-details').off('click');
      $('body').removeClass('overlay-active');
    });

  });

  $('.display').on('click', function () {
    let state = $('.choices').css('display');
    if (state == 'none') {
      $('.choices').css('display', 'flex');
    } else {
      $('.choices').css('display', 'none');
    }
  });
  
  let queryParameters = {};

  $('.choice-item').on('change', function () {
    const category = $(this).attr('name');
    let value = $(this).closest('label').text().trim();
    queryParameters[category] = value;
  
    $('label').has('input[name="' + category + '"]').removeClass('selected');
    $(this).closest('label').addClass('selected');
  });

  $('.search-btn').on('click', function () {
    if (Object.keys(queryParameters) == 0) {
      alert('you must choose some categories');
    } else {
      $('.choices').css('display', 'none');
      let parameters = "";
      for (key in queryParameters) {
        parameters += `${key}=${queryParameters[key]}&`
      }
      const url = `https://api.spoonacular.com/recipes/complexSearch?${parameters}sort=random&addRecipeNutrition=true&addRecipeInstructions=true&number=24&apiKey=5aadec4c06d548298be16668bc8a2cc1`
      $.ajax({
        url: url,
        method: 'GET',
        dataType: 'json',
        success: function (response) {
          for (recipe of response.results) {
            $('#result').append(
              `<div class="recipe-card">
                <div class="recipe-img">
                  <img src="${recipe.image}" alt="${recipe.title}">
                  <a href="#" id="${recipe.id}" class="btn">View Recipe</a>
                </div>
                <div class="recipe-title">
                  <h3>${recipe.title}</h3>
                </div>
              </div>`
            );
          };
        },
        error: function (xhr, status, error) {
          console.log('Error:', status, error);
          console.log(error);
        }
      });
      queryParameters = {};
    };
  });

});
