// Function to display the list of ingredients for a cocktail
document.addEventListener('DOMContentLoaded', function () {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

// Function to style drink button when clicked
document.querySelectorAll('.button-header').forEach(function(button) {
    button.addEventListener('click', function() {
        // Toggle the clicked class on the button itself
        this.classList.toggle('clicked');

        // Find the icon inside the button
        var icon = this.querySelector('.toggle-icon');

        // Toggle the icon class between bi-caret-down and bi-caret-up
        if (icon.classList.contains('bi-caret-down')) {
            icon.classList.remove('bi-caret-down');
            icon.classList.add('bi-caret-up');
        } else {
            icon.classList.remove('bi-caret-up');
            icon.classList.add('bi-caret-down');
        }
    });
});