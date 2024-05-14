$(document).ready(function() {
    // Contact form submission
    $('#contact-form').submit(function(event) {
      event.preventDefault(); // Prevent default form submission
      // Get form data
      var formData = $(this).serialize();
      // Send form data to server (dummy example)
      $.post('submit_contact_form.php', formData, function(response) {
        // Handle response from server (dummy example)
        alert(response);
      });
    });
  });
  