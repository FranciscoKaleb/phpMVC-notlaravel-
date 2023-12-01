<?php

// router.php



function handleRequest()
{
    $uri = $_SERVER['REQUEST_URI'];
    $uri = trim($uri, '/');
    $segments = explode('/', $uri);

    $page = isset($segments[0]) ? $segments[0] : '';
    $userId = isset($segments[1]) ? $segments[1] : '';

    // Check if the user is logged in
    $isLoggedIn = isset($_SESSION['user_id']);

    //$page = '';
    $isLoggedIn = true;

    switch ($page) {
        // [0] User visit page, route user to main.html
        // [] main.html runs an ajax/fetch send cookie to server to be validated
        // [1] validate session (if page can only be viewed by certain authority(user/admin))
            // [a] active
                // [] admin dash
                // [] user dash
            // [b] inactive/expired
                // [] log in page
        // [2] route to respective view
            
        case '':
            include 'views/main';
            //echo 'dumb';
            //if ($isLoggedIn) {
                // Redirect to the dashboard if logged in
                //echo 'df';
            //} else {
              //  echo json_encode(['content' => 'login']);
            //}
            break;

        case 'dashboard':
            //header('Location: views/dashboard');
            include 'views/dashboard';
            
            //include 'views/help';
            break;

        case 'help':
            include 'views/help';
            break;

        case 'login':
            include 'views/login';
            break;

        case 'register':
            include 'views/register';
            break;
    

        case 'profile': // for viewing own user profile
            require_once 'models/UserModel.php';
            require_once 'controllers/ProfileController.php';

            $profileController = new ProfileController();
            $profileController->showProfile($userId);
            break;

        default:
            // put logic here for viewing other users profile publicly or by authority, see default route in GPT
            // [1] process user cookie to see role and mutuality
            // [2] show info based on the role and settings
            header('HTTP/1.0 404 Not Found');
            echo '404 Not Found';
            break;
    }
}
?>