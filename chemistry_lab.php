<?php
require_once 'core/auth_functions.php';
redirectToLoginIfNotLoggedIn();
require_once 'includes/header.php';
?>
<div class="container">
    <div class="lab-header">
        <div class="lab-icon icon-chemistry"></div>
        <h1>রসায়ন ল্যাব</h1>
        <p>এখানে রসায়নের বিভিন্ন পরীক্ষা ও টুলস ব্যবহার করে শিখতে পারবেন।</p>
    </div>
    <div class="lab-grid">
        <!-- Interactive Periodic Table Card -->
        <a href="periodic_table.php" class="lab-card">
            <h3>ইন্টারেক্টিভ পর্যায় সারণি</h3>
            <p>প্রতিটি মৌলের উপর ক্লিক করে তার বিস্তারিত তথ্য, যেমন পারমাণবিক ভর, গঠন এবং ব্যবহার সম্পর্কে জানুন।</p>
        </a>
        <!-- Chemical Reaction Simulator -->
        <a href="#" class="lab-card inactive">
            <h3>রাসায়নিক বিক্রিয়া সিমুলেটর</h3>
            <p>দুটি ভিন্ন মৌল বা যৌগ মিশিয়ে কী ধরনের বিক্রিয়া হয় তা সিমুলেশনের মাধ্যমে দেখুন। (শীঘ্রই আসছে)</p>
        </a>
        <!-- Titration Experiment -->
        <a href="#" class="lab-card inactive">
            <h3>টাইট্রেশন পরীক্ষা</h3>
            <p>অ্যাসিড-বেস টাইট্রেশন করে একটি অজানা দ্রবণের ঘনত্ব নির্ণয় করুন। (শীঘ্রই আসছে)</p>
        </a>
        <!-- Molecular Model Builder -->
        <a href="#" class="lab-card inactive">
            <h3>আণবিক মডেল বিল্ডার</h3>
            <p>বিভিন্ন পরমাণু ব্যবহার করে নিজের পছন্দ মতো অণু তৈরি করুন এবং তাদের 3D গঠন দেখুন। (শীঘ্রই আসছে)</p>
        </a>
        <!-- Gas Laws Simulation -->
        <a href="#" class="lab-card inactive">
            <h3>গ্যাস সূত্র সিমুলেশন</h3>
            <p>বয়েল, চার্লস এবং অ্যাভোগাড্রোর সূত্র ব্যবহার করে গ্যাসের আচরণ পর্যবেক্ষণ করুন। (শীঘ্রই আসছে)</p>
        </a>
        <!-- Lab Safety Quiz -->
        <a href="#" class="lab-card inactive">
            <h3>ল্যাব নিরাপত্তা কুইজ</h3>
            <p>ভার্চুয়াল ল্যাবে কাজ করার আগে আপনার নিরাপত্তা জ্ঞান পরীক্ষা করুন। (শীঘ্রই আসছে)</p>
        </a>
    </div>
</div>
<?php require_once 'includes/footer.php'; ?>


