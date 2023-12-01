// scripts/main.js

$(document).ready(function() {
    // Your main JavaScript logic here

    // Example: Handle login form submission using AJAX
    $('form').submit(function(event) {
        event.preventDefault();

        $.ajax({
            type: 'POST',
            url: 'login.php',
            data: $(this).serialize(),
            success: function(response) {
                // Parse the JSON response
                var responseData = JSON.parse(response);

                // Update the content dynamically
                $('#content').html(responseData.content);
            }
        });
    });
});

function sayHi(){
    alert('hi visitor');
}

