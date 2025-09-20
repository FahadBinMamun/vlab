<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once 'core/auth_functions.php';
handleRegistrationRequest();
require_once 'includes/header.php';
?>
<div class="container"><div class="form-container"><h2>নতুন অ্যাকাউন্ট তৈরি করুন</h2>
<?php
if(isset($_SESSION['message'])){
    $message_type=isset($_SESSION['message_type'])?$_SESSION['message_type']:'error';
    echo '<div class="message '.$message_type.'">'.$_SESSION['message'].'</div>';
    unset($_SESSION['message']); unset($_SESSION['message_type']);
}
?>
<form action="register.php" method="POST">
    <div class="form-group"><label for="full_name">সম্পূর্ণ নাম</label><input type="text" id="full_name" name="full_name" required></div>
    <div class="form-group"><label for="email">ইমেইল</label><input type="email" id="email" name="email" required></div>
    <div class="form-group"><label for="password">পাসওয়ার্ড</label><input type="password" id="password" name="password" required></div>
    <div class="form-group"><label for="confirm_password">পাসওয়ার্ড নিশ্চিত করুন</label><input type="password" id="confirm_password" name="confirm_password" required></div>
    <div class="form-group"><label for="phone_number">ফোন নম্বর (ঐচ্ছিক)</label><input type="text" id="phone_number" name="phone_number"></div>
    <div class="form-group"><label for="school_name">স্কুলের নাম (ঐচ্ছিক)</label><input type="text" id="school_name" name="school_name"></div>
    <div class="form-group"><label for="class">শ্রেণী</label><select id="class" name="class" required><option value="">-- শ্রেণী নির্বাচন করুন --</option><option value="6">৬ষ্ঠ</option><option value="7">৭ম</option><option value="8">৮ম</option><option value="9">৯ম</option><option value="10">১০ম</option></select></div>
    <div class="form-group"><label for="gender">লিঙ্গ (ঐচ্ছিক)</label><select id="gender" name="gender"><option value="">-- লিঙ্গ নির্বাচন করুন --</option><option value="Male">পুরুষ</option><option value="Female">মহিলা</option><option value="Other">অন্যান্য</option></select></div>
    <button type="submit" class="btn">রেজিস্টার করুন</button>
</form></div></div>
<?php require_once 'includes/footer.php'; ?>