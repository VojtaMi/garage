// Function to highlight the active page link
document.addEventListener("DOMContentLoaded", function() {
    var navLinks = document.querySelectorAll('.nav-link');
    var currentUrl = new URL(window.location.href).pathname;

    navLinks.forEach(function(link) {
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
document.addEventListener("DOMContentLoaded", function() {
    var langLinks = document.querySelectorAll('.lang-link');
    var currentUrlParams = new URLSearchParams(window.location.search);
    var currentLang = currentUrlParams.get('lang');

    langLinks.forEach(function(link) {
        var linkLang = new URLSearchParams(link.getAttribute('href').split('?')[1]).get('lang');
        if (linkLang === currentLang) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

