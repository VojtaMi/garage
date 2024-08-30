document.addEventListener('DOMContentLoaded', function () {
    // Select all flip cards
    var flipCards = document.querySelectorAll('.flip-card');

    // Add event listeners for each flip card
    flipCards.forEach(function (card) {
        // Click event to toggle the flip
        card.addEventListener('click', function () {
            this.querySelector('.flip-card-inner').classList.toggle('is-flipped');
        });

        // Keypress event to toggle the flip
        card.addEventListener('keypress', function (event) {
            // Check if the Enter key (key code 13) or Space key (key code 32) was pressed
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault(); // Prevent default action (scrolling for Space)
                this.querySelector('.flip-card-inner').classList.toggle('is-flipped');
            }
        });

        // Variables to handle swipe detection
        var startX = 0;
        var startY = 0;
        var endX = 0;
        var endY = 0;

        // Touch start event
        card.addEventListener('touchstart', function (event) {
            startX = event.touches[0].clientX;
            startY = event.touches[0].clientY;
        });

        // Touch end event
        card.addEventListener('touchend', function (event) {
            endX = event.changedTouches[0].clientX;
            endY = event.changedTouches[0].clientY;

            // Calculate the difference in X and Y to determine swipe direction
            var diffX = endX - startX;
            var diffY = endY - startY;

            // Check if the swipe is more horizontal than vertical and if it is long enough
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 30) { // 30px threshold for swipe
                // Toggle flip based on swipe direction
                card.querySelector('.flip-card-inner').classList.toggle('is-flipped');
            }
        });
    });
});
