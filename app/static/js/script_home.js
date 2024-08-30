// Home Links at home page scroll to top instead of reloading
document.addEventListener('DOMContentLoaded', function() {
        // Get all home button elements
        var homeButtons = document.querySelectorAll('.home-scroll-up');

        // Define the scroll-to-top function
        function scrollToTop(event) {
            event.preventDefault(); // Prevent the default link behavior
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top
        }

        // Add event listeners to the home buttons
        homeButtons.forEach(function(button) {
            button.addEventListener('click', scrollToTop);
        });
    });