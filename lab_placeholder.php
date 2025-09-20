<?php
require_once 'core/auth_functions.php';
redirectToLoginIfNotLoggedIn();
require_once 'includes/header.php';
?>
<div class="container" style="text-align: center; padding: 60px 20px;">
    <h1>এই ল্যাবটি শীঘ্রই আসছে!</h1>
    <p style="font-size: 1.2em; max-width: 700px; margin: 20px auto;">
        আমরা এই ল্যাবটি তৈরি করার জন্য কাজ করছি। খুব শীঘ্রই এটি আপনার ব্যবহারের জন্য উপলব্ধ হবে। আপনার ধৈর্যের জন্য ধন্যবাদ।
    </p>
    <div style="margin-top: 40px;">
        <a href="dashboard.php" class="btn-primary">ড্যাশবোর্ডে ফিরে যান</a>
    </div>
</div>
<?php require_once 'includes/footer.php'; ?>

