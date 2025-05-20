document.addEventListener("DOMContentLoaded", function () {
    const ageConfirmed = localStorage.getItem("ageConfirmed");
    if (ageConfirmed) return;

    function showAgeModal() {
        const ageModal = new bootstrap.Modal(document.getElementById("ageVerificationModal"), {
            backdrop: 'static',
            keyboard: false
        });
        ageModal.show();
        document.removeEventListener("click", showAgeModal);
        document.removeEventListener("scroll", showAgeModal);
    }

    // Confirm age and store in localStorage
    document.getElementById("confirm-age").addEventListener("click", function () {
        localStorage.setItem("ageConfirmed", true);
        const ageModal = bootstrap.Modal.getInstance(document.getElementById('ageVerificationModal'));
        ageModal.hide();
    });

    // Redirect to an external site if the user declines
    document.getElementById("exit-site").addEventListener("click", function () {
        window.location.href = "https://www.google.com";
    });

    // Require user interaction first
    document.addEventListener("click", showAgeModal);
    document.addEventListener("scroll", showAgeModal);
});
