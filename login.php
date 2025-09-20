<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once 'core/auth_functions.php';
handleLoginRequest();
require_once 'includes/header.php';
?>
<div class="container"><div class="form-container"><h2>লগইন করুন</h2>
<?php
if(isset($_SESSION['message'])){
    $message_type=isset($_SESSION['message_type'])?$_SESSION['message_type']:'error';
    echo '<div class="message '.$message_type.'">'.$_SESSION['message'].'</div>';
    unset($_SESSION['message']); unset($_SESSION['message_type']);
}
?>
<form action="login.php" method="POST">
    <div class="form-group"><label for="email">ইমেইল</label><input type="email" id="email" name="email" required></div>
    <div class="form-group"><label for="password">পাসওয়ার্ড</label><input type="password" id="password" name="password" required></div>
    <button type="submit" class="btn">লগইন</button>
</form></div></div>
<?php require_once 'includes/footer.php'; ?>