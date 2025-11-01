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
    });

    document.getElementById('searchForm').addEventListener('submit', function(e) {
        e.preventDefault();

        // hide intro and move search bar to top
        const topBar = document.querySelector('.top-bar');
        if (topBar) {
            topBar.classList.add('hidden');
        }

        const searchContainer = document.querySelector('.search-container');
        if (searchContainer) {
            searchContainer.classList.add('moved');
        }

                // show results columns now that a search has been run
        var googleResultsBox = document.getElementById('googleResults');
        var bingResultsBox = document.getElementById('bingResults');
        if (googleResultsBox) {
            googleResultsBox.style.display = 'block';
        }
        if (bingResultsBox) {
            bingResultsBox.style.display = 'block';
        }

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
        const bingSearch = 'https://www.bing.com/search?q=' + encodeURIComponent(searchTerm);
                      
        document.getElementById('bingResults').innerHTML = 
        `<iframe src="${bingSearch}" style="width: 100%; height: 80vh;"></iframe>`;
    });

    // Home button
    document.getElementById('homeButton').addEventListener('click', function() {
        // show intro bar again
        const topBar = document.querySelector('.top-bar');
        if (topBar) {
            topBar.classList.remove('hidden');
        }

        // move search bar back to centre
        const searchContainer = document.querySelector('.search-container');
        if (searchContainer) {
            searchContainer.classList.remove('moved');
        }

        // clear search box
        const input = document.getElementById('searchInput');
        if (input) {
            input.value = '';
            input.focus();
        }

        // clear Google Search Results
        var googleResults = document.getElementById('googleResults');
        if (googleResults) {
            googleResults.innerHTML = '';
        }
    
        // clear Bing results
        var bingResults = document.getElementById('bingResults');
        if (bingResults) {
            bingResults.innerHTML = '';
        }

        // hide result columns again on Home/reset
        var googleResultsBox = document.getElementById('googleResults');
        var bingResultsBox = document.getElementById('bingResults');
        if (googleResultsBox) {
            googleResultsBox.style.display = 'none';
        }
        if (bingResultsBox) {
            bingResultsBox.style.display = 'none';
        }
        
    });
});