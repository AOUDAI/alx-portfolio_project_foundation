$(document).ready(function() {
    $('#contact-form').submit(function(event) {
      event.preventDefault();
      var formData = $(this).serialize();
      $.post('submit_contact_form.php', formData, function(response) {
        alert(response);
      });
    });
  });
  