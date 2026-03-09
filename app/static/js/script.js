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
    const AGE_GATE_STORAGE_KEY = "ageGateConsent";
    const AGE_GATE_VERSION = "v1";
    const AGE_GATE_TTL_DAYS = 60;

    function isConsentValid() {
        const raw = localStorage.getItem(AGE_GATE_STORAGE_KEY);
        if (!raw) return false;

        try {
            const consent = JSON.parse(raw);
            if (!consent || consent.version !== AGE_GATE_VERSION) return false;
            if (typeof consent.expiresAt !== "number") return false;
            return consent.expiresAt > Date.now();
        } catch (error) {
            return false;
        }
    }

    function persistConsent() {
        const expiresAt = Date.now() + AGE_GATE_TTL_DAYS * 24 * 60 * 60 * 1000;
        const payload = { version: AGE_GATE_VERSION, expiresAt: expiresAt };
        localStorage.setItem(AGE_GATE_STORAGE_KEY, JSON.stringify(payload));
    }

    // Backward compatibility with old boolean storage key.
    if (localStorage.getItem("ageConfirmed")) {
        persistConsent();
        localStorage.removeItem("ageConfirmed");
    }

    if (isConsentValid()) return;

    const ageModal = document.getElementById("ageVerificationModal");
    const confirmButton = document.getElementById("confirm-age");
    const exitButton = document.getElementById("exit-site");

    if (!ageModal || !confirmButton || !exitButton) return;

    const supportsDialog = typeof ageModal.showModal === "function";
    const fallbackPrompt = ageModal.dataset.confirmText || "18+ ?";

    // Confirm age and store in localStorage
    confirmButton.addEventListener("click", function () {
        persistConsent();
        if (supportsDialog && ageModal.open) {
            ageModal.close("approved");
        }
    });

    // Redirect to an external site if the user declines
    exitButton.addEventListener("click", function () {
        window.location.href = "https://www.google.com";
    });

    if (!supportsDialog) {
        const accepted = window.confirm(fallbackPrompt);
        if (accepted) {
            persistConsent();
        } else {
            window.location.href = "https://www.google.com";
        }
        return;
    }

    // Keep dialog modal; require explicit user choice.
    ageModal.addEventListener("cancel", function (event) {
        event.preventDefault();
    });
    ageModal.addEventListener("click", function (event) {
        const dialogRect = ageModal.getBoundingClientRect();
        const clickedInsideDialog =
            event.clientX >= dialogRect.left &&
            event.clientX <= dialogRect.right &&
            event.clientY >= dialogRect.top &&
            event.clientY <= dialogRect.bottom;
        if (!clickedInsideDialog) {
            event.preventDefault();
        }
    });

    function showAgeModal() {
        if (!ageModal.open) {
            ageModal.showModal();
        }
        document.removeEventListener("click", showAgeModal);
        document.removeEventListener("scroll", showAgeModal);
    }

    // Require user interaction first
    document.addEventListener("click", showAgeModal);
    document.addEventListener("scroll", showAgeModal);
});
