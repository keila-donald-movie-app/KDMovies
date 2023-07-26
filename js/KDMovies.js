(() => {

// ////////////Fetch AP targeting search input///////////////////////////

    const getMoviesBySearch = async (queryParam) => {
        try {
            const queryString = `?query=${encodeURIComponent(queryParam)}&api_key=${MOVIE_API_KEY}`;
            const baseUrl = 'https://api.themoviedb.org/3/search/movie';
            const url = baseUrl + queryString;
            const options = {
                method: "GET",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${MOVIE_API_KEY}`,
                },
            };

            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const movies = await response.json();
            const container4 = document.getElementById("container4");
            container4.innerHTML = ''; // Clear previous search results

            if (queryParam.trim() === '') {
                // If search bar is empty, hide the search query header
                searchQueryHeader.style.display = 'none';
            } else if (movies.results.length === 0) {
                // If no movies found, display a message with <h1> element
                searchQueryHeader.style.display = 'none';
                const message = document.createElement('h1');
                message.textContent = "I'm sorry, but there are currently no movies found for your request. Please check your spelling or search a different movie.";
                container4.appendChild(message);
            } else {
                searchQueryHeader.textContent = `Search results for: ${queryParam}`;
                searchQueryHeader.style.display = 'block';

                movies.results.forEach(movie => {
                    const card = renderMovieCard(movie);
                    container4.appendChild(card);
                });
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', (event) => {
        const searchTerm = event.target.value;
        getMoviesBySearch(searchTerm);
    });

// ////////////End Fetch AP targeting search input///////////////////////////


////////////////////////Popular Movies fetch Row///////////////////////////
    function renderMovieCard(movie, isFav) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
                        <img class="card-img-top" src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
                        <div class="card-body">
                            <h5 class="card-title">${movie.title}</h5>
                            <p class="card-text">
                                Released: ${movie.release_date} <br>
                                Rating: ${movie.vote_average}
                            </p>
                            ${isFav ? '<button class="btn btn-primary remove">Remove</button>' : `<button class="btn btn-primary edit">Add to Favorite</button>`}
                        </div>
                    `;
        if (!isFav) {
            const button = card.querySelector("button.btn.btn-primary.edit")
            button.addEventListener("click", (event) => {
                const url = 'http://localhost:3000/movies';
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(movie)
                }
                fetch(url, options)
                    .then(response => response.json())
                    .then(data => {
                        // console.log(data);
                        const container5 = document.getElementById("container5");
                        const card = renderMovieCard(data, true);
                        container5.appendChild(card);
                    })
            });
        } else {
            const button = card.querySelector("button.btn.btn-primary.remove")
            button.addEventListener("click", (event) => {
                const url = `http://localhost:3000/movies/${movie.id}`;
                const options = {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(movie)
                }
                fetch(url, options)
                    .then(response => response.json())
                    .then(data => {
                        // console.log(data);
                        card.remove();
                    })
            });
        }
        return card;
    }

    function getPopMovies() {
        const popularUrl = "https://api.themoviedb.org/3/movie/popular?api_key=" + MOVIE_API_KEY;
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
            },
        };


        fetch(popularUrl, options)
            .then(response => response.json())
            .then(movies => {
                const container1 = document.getElementById("container1");
                movies.results.forEach(movie => {
                    const card = renderMovieCard(movie);
                    container1.appendChild(card);
                });
            })
            .catch(err => console.error(err));

    }

    getPopMovies();

////////Top rated Movies fetch Row///////////////////////////
    function getTopMovies() {
        const topRatedUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${MOVIE_API_KEY}&language=en-US`;
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
            },
        };

        fetch(topRatedUrl, options)
            .then(response => response.json())
            .then(movies => {
                const container3 = document.getElementById("container3");

                movies.results.forEach(movie => {
                    const card = renderMovieCard(movie);
                    container3.appendChild(card);
                });
            })
            .catch(err => console.error(err));
    }

    getTopMovies();

    //////// End of Top rated Movies fetch Row///////////////////////////

////////Upcoming Movies fetch Row///////////////////////////
    function getSoonMovies() {
        const upcomingUrl = "https://api.themoviedb.org/3/movie/upcoming?=&api_key=" + MOVIE_API_KEY;
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
            },
        };

        fetch(upcomingUrl, options)
            .then(response => response.json())
            .then(movies => {
                const container2 = document.getElementById("container2");

                movies.results.forEach(movie => {
                    const card = renderMovieCard(movie);
                    container2.appendChild(card);
                });
            })
            .catch(err => console.error(err));
    }

    getSoonMovies();

// End of Upcoming  Movies fetch Row///////////////////////////

    function getFavMovies() {
        const favUrl = "http://localhost:3000/movies";
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
            },
        }
        fetch(favUrl, options)
            .then(response => response.json())
            .then(movies => {
                console.log(movies);
                const container5 = document.getElementById("container5");
                movies.forEach(movie => {
                    const card = renderMovieCard(movie, true);
                    container5.appendChild(card);
                });
            })
    }

    getFavMovies();

////////////////////////Favorite Option///////////////////////////

})();








