<?php
require_once 'core/auth_functions.php';
redirectToLoginIfNotLoggedIn();
require_once 'includes/header.php';

// Build a robust path to the JSON file
$json_path = __DIR__ . '/../assets/data/elements.json';
$json_data = '';

if (file_exists($json_path)) {
    $json_data = file_get_contents($json_path);
} else {
    // Handle error: file not found
    error_log("Error: elements.json not found at " . $json_path);
}
?>

<!-- Embed JSON data directly into the page -->
<script>
    // Check if data was loaded successfully before assigning
    const periodicTableJSON = <?php echo !empty($json_data) ? $json_data : '[]'; ?>;
    if (periodicTableJSON.length === 0) {
        console.error("Periodic table data could not be loaded from the server.");
    }
</script>

<!-- Ei page-er jonno proyojoniyo specific CSS file -->
<link rel="stylesheet" href="assets/css/periodic_table.css?v=<?php echo time(); ?>">

<div class="container">
    <div class="lab-header">
        <h2>ইন্টারেক্টিভ পর্যায় সারণি</h2>
        <p>যেকোনো মৌলের উপর ক্লিক করে তার বিস্তারিত তথ্য ও বাস্তবসম্মত 3D মডেল দেখুন।</p>
    </div>

    <div id="pt-legend" class="pt-legend"></div>

    <div id="periodic-table-container">
        <div id="periodic-table-main"></div>
        <div id="periodic-table-f-block"></div>
    </div>

    <div id="element-modal" class="modal">
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <div class="modal-body">
                <div class="modal-left">
                    <div id="atom-canvas-container">
                        <!-- 3D অ্যাটম মডেল এখানে রেন্ডার হবে -->
                    </div>
                </div>
                <div class="modal-right">
                    <div id="element-details"></div>
                    <div id="atom-controls">
                        <button class="control-btn active" data-model="quantum">Quantum</button>
                        <button class="control-btn" data-model="bohr">Bohr</button>
                        <button class="control-btn" data-model="rutherford">Rutherford</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- 3D Model Libraries -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>

<!-- Main Script -->
<script src="assets/js/periodic_table.js?v=<?php echo time(); ?>"></script>

<?php require_once 'includes/footer.php'; ?>