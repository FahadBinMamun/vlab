<?php require_once 'includes/header.php'; ?>
<div class="container" style="text-align: center; padding: 60px 20px;">
    <h1>নেক্সটজেন ভার্চুয়াল ল্যাবে আপনাকে স্বাগতম</h1>
    <p style="font-size: 1.2em; max-width: 700px; margin: 20px auto;">
        স্কুল পর্যায়ের বিজ্ঞানকে আরও সহজ ও আনন্দদায়ক করতে আমাদের এই প্রচেষ্টা। এখানে আপনি পদার্থবিজ্ঞান, রসায়ন, জীববিজ্ঞানসহ বিভিন্ন বিষয়ের পরীক্ষা-নিরীক্ষাগুলো সিমুলেশনের মাধ্যমে নিজের হাতে করতে পারবেন।
    </p>
    <div style="margin-top: 40px;">
        <?php if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] === true): ?>
            <a href="dashboard.php" class="btn-primary">ড্যাশবোর্ডে যান</a>
        <?php else: ?>
            <a href="register.php" class="btn-primary">আজই রেজিস্টার করুন</a>
            <a href="login.php" class="btn-secondary">লগইন করুন</a>
        <?php endif; ?>
    </div>
</div>
<?php require_once 'includes/footer.php'; ?>


