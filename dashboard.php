<?php
require_once 'core/auth_functions.php';
redirectToLoginIfNotLoggedIn();
require_once 'includes/db_connect.php';
$labs_result = $conn->query("SELECT * FROM labs ORDER BY lab_id");
require_once 'includes/header.php';
?>
<div class="container">
    <div class="dashboard-header">
        <h2>আমার ড্যাশবোর্ড</h2>
        <p>স্বাগতম, <?php echo htmlspecialchars($_SESSION['full_name']); ?>! আপনার পছন্দের ল্যাবটি বেছে নিন।</p>
    </div>
    <div class="lab-grid">
        <?php
        if ($labs_result && $labs_result->num_rows > 0) {
            while ($lab = $labs_result->fetch_assoc()) {
                $card_class = $lab['is_active'] ? '' : ' inactive';
                $href = $lab['is_active'] ? htmlspecialchars($lab['lab_page_url']) : '#';
        ?>
            <a href="<?php echo $href; ?>" class="lab-card<?php echo $card_class; ?>">
                <div class="lab-icon <?php echo htmlspecialchars($lab['icon_class']); ?>"></div>
                <h3><?php echo htmlspecialchars($lab['lab_name']); ?></h3>
                <p><?php echo htmlspecialchars($lab['lab_description']); ?></p>
            </a>
        <?php } } else { echo "<p>দুঃখিত, এই মুহূর্তে কোনো ল্যাব উপলব্ধ নেই।</p>"; } $conn->close(); ?>
    </div>
</div>
<?php require_once 'includes/footer.php'; ?>


