<?php
session_start();
?>
<!DOCTYPE html>
<html lang="bn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>নেক্সটজেন ভার্চুয়াল ল্যাব</title>
    <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <header>
        <div class="container">
            <nav>
                <a href="index.php" class="logo">NextGen ল্যাব</a>
                <ul>
                    <?php if (isset($_SESSION['user_id'])): ?>
                        <li><a href="dashboard.php">ড্যাশবোর্ড</a></li>
                        <li><a href="logout.php">লগআউট</a></li>
                    <?php else: ?>
                        <li><a href="login.php">লগইন</a></li>
                        <li><a href="register.php">রেজিস্টার</a></li>
                    <?php endif; ?>
                </ul>
            </nav>
        </div>
    </header>
    <main>

