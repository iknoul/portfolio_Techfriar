document.querySelector('.menuIcon').addEventListener('click', function() {
    var navAnchors = document.querySelector('.navAnchors');
    // Toggle navigation visibility when the menu icon is clicked
    if (navAnchors.style.display === 'none' || navAnchors.style.display === '') {
        navAnchors.style.setProperty('display', 'flex', 'important');
    }
});

document.getElementById('navBack').addEventListener('click', function() {
    var navAnchors = document.querySelector('.navAnchors');
    // Hide navigation when the back button is clicked
    navAnchors.style.setProperty('display', 'none', 'important');
});

window.addEventListener('resize', function() {
    var navAnchors = document.querySelector('.navAnchors');
    // Ensure proper navigation display on window resize based on screen width
    if (window.innerWidth > 800) {
        navAnchors.style.display = 'flex';
    } else {
        navAnchors.style.display = 'none';
    }
});

