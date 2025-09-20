<?php
// === Database Connection File ===
// Ei file-ti amader website-ke MySQL database-er sathe connect korbe.

// Database-er proyojoniyo tothyo
define('DB_SERVER', 'localhost'); // Apnar hosting provider etar thikana bole debe
define('DB_USERNAME', 'forbitto_vlab_user'); // Apnar database-er username
define('DB_PASSWORD', 'FORBIT@vlab66'); // Apnar database-er password
define('DB_NAME', 'forbitto_vlab_db'); // Apnar database-er naam

// Database-er sathe connect korar chesta
$conn = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

// Connection thik ache kina check kora
if ($conn->connect_error) {
    die("Connection Failed: " . $conn->connect_error);
}

// Character set thik kora jate Bangla shothikvabe support kore
$conn->set_charset("utf8mb4");
?>