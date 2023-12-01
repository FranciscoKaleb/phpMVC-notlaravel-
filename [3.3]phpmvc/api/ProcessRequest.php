<?php
include "../db_config.php";
include "../controllers/SignUpController.php";


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Handle GET request
    switch($_GET['action']){

        case 'populateAddressSelect':
            $SUCObj = new SignUpController();
            echo json_encode($SUCObj->chooseLevel($_GET['level'],$conn, $data)); 
        break;

        case '':
        break;

        default:

    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
   
    $json = file_get_contents('php://input'); 
    $formData = json_decode($json, true);     
    
    switch ($_GET['action']) {
        
        case 'populateAddressSelect':

            if($_GET['level'] == 'province'){
                $data = $formData["regDesc"];
            }
            else if($_GET['level'] == 'city'){
                $data = $formData["provCode"];
            }
            else{
                $data = $formData["citymunCode"];
            }
                // this the problem
            $SUCObj = new SignUpController();
            echo json_encode($SUCObj->chooseLevel($_GET['level'],$conn, $formData));

        break;
       
        default:
            echo 'Invalid action.';
    }
}

// function handleProfileRequest() {
//     // Process and respond to the profile request
//     $userId = $_GET['user_id'];

//     $userModel = new UserModel();
//     $userData = $userModel->getUserProfile($userId);

//     if ($userData) {
//         echo json_encode($userData);
//     } else {
//         echo json_encode(['error' => 'User not found']);
//     }
// }
?>
