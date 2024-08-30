
document.getElementById('display-map-button').addEventListener('click', function() {
    // Hide the map-button-container
    document.getElementById('map-button-container').classList.add('d-none');

    // Show the iframe container
    var iframeContainer = document.getElementById('iframe-container');
    iframeContainer.classList.remove('d-none');

    // Create the iframe element
    var iframe = document.createElement('iframe');
    iframe.id = 'map-iframe';
    iframe.className = 'flex-grow-1';
    iframe.style.border = 'none';
    iframe.style.width = '100%';
    iframe.style.height = '400px';
    iframe.src = 'https://en.frame.mapy.cz/s/casumubehu';
    iframe.frameBorder = '0';

    // Append the iframe to the container
    iframeContainer.appendChild(iframe);
});

