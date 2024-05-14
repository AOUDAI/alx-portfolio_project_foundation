$(document).ready(function() {

  if (sessionStorage.getItem('recipes') === null) {
    $.ajax({
      url: "https://api.spoonacular.com/recipes/complexSearch?cuisine=italian&sort=random&addRecipeNutrition=true&addRecipeInstructions=true&number=6&apiKey=5aadec4c06d548298be16668bc8a2cc1",
      method: 'GET',
      dataType: 'json',
      success: function (response) {
        sessionStorage.setItem('recipes', JSON.stringify(response.results));
      },
      error: function (xhr, status, error) {
        console.log('Error:', status, error);
        console.log(error);
      }
    });
  }

  if (sessionStorage.getItem('desserts') === null) {
    $.ajax({
      url: "https://api.spoonacular.com/recipes/complexSearch?type=dessert&sort=random&addRecipeNutrition=true&addRecipeInstructions=true&number=6&apiKey=5aadec4c06d548298be16668bc8a2cc1",
      method: 'GET',
      dataType: 'json',
      success: function (response) {
        sessionStorage.setItem('desserts', JSON.stringify(response.results));
      },
      error: function (xhr, status, error) {
        console.log('Error:', status, error);
        console.log(error);
      }
    });
  }

  if (sessionStorage.getItem('drinks') === null) {
    $.ajax({
      url: "https://api.spoonacular.com/recipes/complexSearch?type=drink&sort=random&addRecipeNutrition=true&addRecipeInstructions=true&number=6&apiKey=5aadec4c06d548298be16668bc8a2cc1",
      method: 'GET',
      dataType: 'json',
      success: function (response) {
        sessionStorage.setItem('drinks', JSON.stringify(response.results));
      },
      error: function (xhr, status, error) {
        console.log('Error:', status, error);
        console.log(error);
      }
    });
  }

  for (recipe of JSON.parse(sessionStorage.getItem('recipes'))) {
    $('#class1').append(
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

  for (recipe of JSON.parse(sessionStorage.getItem('desserts'))) {
    $('#class2').append(
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

  for (recipe of JSON.parse(sessionStorage.getItem('drinks'))) {
    $('#class3').append(
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

  $('.recipe-card .btn').click(function(e) {
    e.preventDefault();
    $('.overlay').addClass('active');
    $('.recipe-content-board').slideDown('medium');
    $('.recipe-content-board').css('display', "flex");
    $('body').addClass('overlay-active');

    const myId = $(this).prop('id');
    let myRecipe = JSON.parse(sessionStorage.getItem('recipes')).find(function (obj) {
      return obj.id == myId;
    });

    if (myRecipe === undefined) {
      myRecipe = JSON.parse(sessionStorage.getItem('desserts')).find(function (obj) {
        return obj.id == myId;
      });
    }

    if (myRecipe === undefined) {
      myRecipe = JSON.parse(sessionStorage.getItem('drinks')).find(function (obj) {
        return obj.id == myId;
      });
    }

    console.log(myRecipe);
  
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
      <h4>ready in minutes: ${myRecipe.readyInMinutes}</h4>`
    );

    $('.recipe-ingredients').append(
      `<h3>Ingredients:</h3>
      <p>${ingredients}</p>`
    )

    $('.recipe-instructions').append(
      `<h3>Instructions:</h3>
      <p>${instructions}</p>`
    )
  });

  $('.close-btn').click(function() {
    $('.overlay').removeClass('active');
    $('.recipe-content-board').slideUp('medium');
    $('.recipe-details').empty();
    $('.recipe-ingredients').empty();
    $('.recipe-instructions').empty();
    $('body').removeClass('overlay-active');
  });

  $('.comment-form').submit(function(e) {
    e.preventDefault();
  });
});
