
document.addEventListener('DOMContentLoaded', function() {
    var gcseReady = false;

    // Check if GCSE script is loaded
    var checkGCSE = setInterval(function() {
        if (typeof google !== 'undefined' && 
            google.search && 
            google.search.cse && 
            google.search.cse.element) {
            clearInterval(checkGCSE);
            gcseReady = true;
            console.log('GCSE script is ready.');
        } else {
            console.log('Waiting for GCSE script...');
        }
    }, 100); // check every 100ms

document.addEventListener('keydown', function(event) {
    if (event.key === '/') {
        event.preventDefault(); // Prevents the default action of the '/' key
        document.getElementById('searchInput').focus(); // Focus on the search box
    }
})


    document.getElementById('searchForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!gcseReady) {
            console.log('GCSE script is not ready yet. Please wait.');
            return;
        }

        const searchTerm = document.getElementById('searchInput').value;        
        console.log('Search term is: ', searchTerm);

        // Execute the search using the GCSE API
        var elements = google.search.cse.element.getAllElements();
        if (elements) {
            Object.keys(elements).forEach(function(key) {
                elements[key].execute(searchTerm);
            });
        } else {
            console.log('GCSE elements not found again.');
        }

        // Making a variable of the Bing url. Bing website + search Term variable
        const bingSearch = 'https://www.bing.com/search?q=' + searchTerm;
                      
        document.getElementById('bingResults').innerHTML = 
        `<iframe src="${bingSearch}" style="width: 100%; height: 80vh;"></iframe>`;

    });

    // Home button, not working for removing bing results
    document.getElementById('homeButton').addEventListener('click', function() {
        // Clear Google Search Results
        var googleResults = document.getElementById('googleResults');
        if (googleResults) {
            googleResults.innerHTML = '';
        }
    
        // Completely remove the Bing iframe and recreate it
        var bingContainer = document.getElementById('bingContainer'); // Ensure this is the parent of the iframe
        var oldIframe = document.getElementById('bingResults');
        if (bingContainer && oldIframe) {
            bingContainer.removeChild(oldIframe);
            var newIframe = document.createElement('iframe');
            newIframe.id = 'bingResults';
            bingContainer.appendChild(newIframe);
        }
    });
});




