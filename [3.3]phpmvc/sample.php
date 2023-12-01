<?php
include 'db_config.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    echo "Connected successfully";

    // Close connection
    $conn->close();
}

    
?>