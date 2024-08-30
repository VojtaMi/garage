// Center the carousel when the page loads
document.addEventListener("DOMContentLoaded", function () {
    function centerElement(element) {
        var el = document.querySelector(element);
        if (el) {
            var elementOffset = el.getBoundingClientRect().top + window.pageYOffset;
            var elementHeight = el.offsetHeight;
            var viewportHeight = window.innerHeight;

            // Calculate the scroll position to center the element
            var scrollTop = elementOffset - (viewportHeight / 2) + (elementHeight / 2);

            // Smoothly scroll to the calculated position
            window.scrollTo({
                top: scrollTop,
                behavior: 'smooth'
            });
        }
    }
    centerElement('#myCarousel');
});

// display extra image section
document.addEventListener('DOMContentLoaded', function() {
        // Get the button element
        var button = document.getElementById('gallery_btn');
        // Get the hidden image section
        var hiddenImageSection = document.getElementById('hidden-image-section');

        // Add click event listener to the button
        button.addEventListener('click', function() {
            // Remove 'd-none' class to show the hidden image section
            hiddenImageSection.classList.remove('d-none');

            // Optionally hide the button after clicking
            button.classList.add('d-none');
        });
    });
