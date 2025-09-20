<?php
// === Authentication Functions File ===
if (session_status() == PHP_SESSION_NONE) { session_start(); }

// Registration handle function
function handleRegistrationRequest() {
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        require_once 'includes/db_connect.php';
        $full_name = $_POST['full_name'];
        $email = $_POST['email'];
        $password = $_POST['password'];
        $confirm_password = $_POST['confirm_password'];
        $phone_number = !empty($_POST['phone_number']) ? $_POST['phone_number'] : null;
        $school_name = !empty($_POST['school_name']) ? $_POST['school_name'] : null;
        $class = $_POST['class'];
        $gender = !empty($_POST['gender']) ? $_POST['gender'] : null;

        if ($password !== $confirm_password) {
            $_SESSION['message'] = "দুটি পাসওয়ার্ড মেলেনি।"; $_SESSION['message_type'] = 'error'; header("Location: register.php"); exit();
        }

        $stmt = $conn->prepare("SELECT user_id FROM users WHERE email = ?");
        $stmt->bind_param("s", $email); $stmt->execute(); $stmt->store_result();
        if ($stmt->num_rows > 0) {
            $_SESSION['message'] = "এই ইমেইলটি দিয়ে ইতিমধ্যে একটি অ্যাকাউন্ট খোলা হয়েছে।"; $_SESSION['message_type'] = 'error'; $stmt->close(); $conn->close(); header("Location: register.php"); exit();
        }
        $stmt->close();

        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $conn->prepare("INSERT INTO users (full_name, email, password, phone_number, school_name, class, gender) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sssssis", $full_name, $email, $hashed_password, $phone_number, $school_name, $class, $gender);

        if ($stmt->execute()) {
            $_SESSION['message'] = "রেজিস্ট্রেশন সফল হয়েছে! এখন আপনি লগইন করতে পারেন।"; $_SESSION['message_type'] = 'success';
        } else {
            $_SESSION['message'] = "দুঃখিত, রেজিস্ট্রেশন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।"; $_SESSION['message_type'] = 'error';
        }
        $stmt->close(); $conn->close(); header("Location: register.php"); exit();
    }
}

// Login handle function
function handleLoginRequest() {
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        require 'includes/db_connect.php';
        $email = $_POST['email']; $password = $_POST['password'];
        $stmt = $conn->prepare("SELECT user_id, full_name, password FROM users WHERE email = ? AND status = 'active'");
        $stmt->bind_param("s", $email); $stmt->execute(); $result = $stmt->get_result();
        if ($result->num_rows === 1) {
            $user = $result->fetch_assoc();
            if (password_verify($password, $user['password'])) {
                $_SESSION['loggedin'] = true; $_SESSION['user_id'] = $user['user_id']; $_SESSION['full_name'] = $user['full_name'];
                header("Location: dashboard.php"); exit();
            }
        }
        $_SESSION['message'] = "আপনার দেওয়া ইমেইল বা পাসওয়ার্ডটি সঠিক নয়।"; $_SESSION['message_type'] = 'error';
        $stmt->close(); $conn->close(); header("Location: login.php"); exit();
    }
}

function isUserLoggedIn() { return isset($_SESSION['loggedin']) && $_SESSION['loggedin'] === true; }
function redirectToLoginIfNotLoggedIn() { if (!isUserLoggedIn()) { header("Location: login.php"); exit(); } }
?>