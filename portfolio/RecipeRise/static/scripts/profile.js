$(document).ready(function() {
    // Get the user's name
    const userName = 'John Doe'; // Replace with the user's actual name
    $('#user-name').text(userName);

    // Add click event listener to each menu item
    $('.menu li').click(function() {
        // Remove active class from all menu items
        $('.menu li').removeClass('active');

        // Hide all content boards
        $('.content-board').hide();

        // Add active class to the clicked menu item
        $(this).addClass('active');

        // Get the corresponding content board
        const contentId = $(this).attr('id').replace('-btn', '-content');

        // Display the corresponding content board on top of the menu
        $('#' + contentId).show().addClass('active');
    });

    // Add click event listener to the "Add" button for all content boards
    $('.content-board').on('click', '.add-btn', function() {
        const newElement = $(this).siblings('input[type="text"]').val();
        if (newElement.trim() !== '') {
            const listItem = $('<li>').text(newElement).append($('<button class="remove-btn">Remove</button>'));
            $(this).closest('.content-board').find('ul').append(listItem);
            $(this).siblings('input[type="text"]').val('');
        }
    });

    // Add click event listener to dynamically added remove buttons for all content boards
    $('.content-board').on('click', 'button.remove-btn', function() {
        $(this).closest('li').remove();
    });


    // Allow adding item by pressing Enter key
    $('.add-input').keypress(function(event) {
        if (event.which === 13) {
            $(this).siblings('.add-btn').click();
            return false; // Prevent form submission
        }
    });
});
