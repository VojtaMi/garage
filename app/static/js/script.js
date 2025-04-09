// Function to highlight the active page link
document.addEventListener("DOMContentLoaded", function () {
    var navLinks = document.querySelectorAll('.nav-link');
    var currentUrl = new URL(window.location.href).pathname;

    navLinks.forEach(function (link) {
        if (link.getAttribute('href') && link.getAttribute('href') !== '#') {
            var linkUrl = new URL(link.href).pathname;
            if (linkUrl === currentUrl) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }
        }
    });
});



// Function to highlight the active language link
document.addEventListener("DOMContentLoaded", function () {
    var langLinks = document.querySelectorAll('.lang-link');

    // Extract the current language from the URL path (e.g., /cs/ or /en/)
    var currentLang = window.location.pathname.split('/')[1]; // Get the first part of the path

    langLinks.forEach(function (link) {
        var linkLang = link.getAttribute('href').split('/')[1]; // Get the first part of the href path
        if (linkLang === currentLang) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const ageConfirmed = sessionStorage.getItem("ageConfirmed");
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

    // Confirm age and store in sessionStorage
    document.getElementById("confirm-age").addEventListener("click", function () {
        sessionStorage.setItem("ageConfirmed", true);
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


