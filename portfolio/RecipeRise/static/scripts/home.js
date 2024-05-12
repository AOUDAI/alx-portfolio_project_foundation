$(document).ready(function() {
  if (sessionStorage.getItem('recipes') === null) {
    $.ajax({
      url: "https://api.spoonacular.com/recipes/complexSearch?cuisine=italian&number=10&apiKey=5aadec4c06d548298be16668bc8a2cc1",
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
  for (recipe of JSON.parse(sessionStorage.getItem('recipes'))) {
    console.log(recipe);
    $('.recipe-items').append(
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

  // Event listener for clicking "View Recipe" button
  $('.recipe-card .btn').click(function(e) {
    e.preventDefault();
    // Show the overlay
    $('.overlay').addClass('active');
    // Show the recipe content board with medium speed animation
    $('.recipe-content-board').slideDown('medium');
    // Add 'overlay-active' class to body to disable scrolling
    $('body').addClass('overlay-active');
    const id = $(this).prop('id');
    const recipe = JSON.parse(sessionStorage.getItem('recipes')).find(function (obj) {
      return obj.id === id;
    });
    $('.recipe-details').append(
      `<p>${recipe.title}</p>
      <img src="${recipe.image}">`
    );
  });

  // Event listener for clicking "Close" button
  $('.close-btn').click(function() {
    // Hide the overlay
    $('.overlay').removeClass('active');
    // Hide the recipe content board with medium speed animation
    $('.recipe-content-board').slideUp('medium');
    // Remove 'overlay-active' class from body to enable scrolling
    $('body').removeClass('overlay-active');
  });

  // Event listener for submitting comment form
  $('.comment-form').submit(function(e) {
    e.preventDefault();
    // Add new comment dynamically and update the comments section
  });
});
