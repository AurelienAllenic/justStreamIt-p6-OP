const fetchTheBestMovie = () => {
    fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score")
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok for best movies');
        }
        return response.json();
    })
    .then(data => {
        const bestMovie = data.results[0];
        const banner = document.getElementById('banner');
        banner.style.backgroundImage = `url(${bestMovie.image_url})`;
        const bannerTitle = document.getElementById('banner_title');
        bannerTitle.textContent = bestMovie.title;

        fetch(bestMovie.url)
            .then(response => response.json())
            .then(movieDetails => {
                const bannerDescription = document.getElementById('banner_description');
                bannerDescription.textContent = movieDetails.description;

                // Ajouter l'action du bouton Play ici
                const playButton = document.getElementById('playButton');
        playButton.onclick = () => {
                displayModal(bestMovie.id);
            };             
            })
            .catch(error => {
                console.error('Error fetching movie details:', error);
            });
    })
    .catch(error => {
        console.error('There has been a problem with your initial fetch operation:', error);
    });
}

const closeModal = () => {
    const modal = document.getElementById('movieModal');
    modal.style.display = 'none';
}
const displayModal = (id) => {
    fetch(`http://localhost:8000/api/v1/titles/${id}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok for best movies');
        }
        return response.json();
    })
    .then(data => {
    const modal = document.getElementById('movieModal');
    console.log(data)
    
    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-summary').textContent = data.summary;
    document.getElementById('modal-image').src = data.image_url;
    const genresString = data.genres.join(', '); // Crée une chaîne "Drame, Action"
    document.getElementById('modal-genre').textContent = genresString;
    const rawDate = data.date_published; // par exemple, '2010-12-15'
    const formattedDate = rawDate.split('-').reverse().join('/'); // transforme en '15/12/2010'
    document.getElementById('modal-release-date').textContent = formattedDate;
    document.getElementById('modal-duration').textContent = data.duration + 'min';
    document.getElementById('modal-imdb-score').textContent = 'IMDB score: ' + data.imdb_score;
    if(data.rated === 'Not rated or unkown rating'){
        document.getElementById('modal-score').textContent = 'Score : Not rated';
    }else{
        document.getElementById('modal-score').textContent = 'Score' + data.rated + '/10';
    }
    const directorsString = data.directors.join(', ');
    document.getElementById('modal-director').textContent = "Directeur : " + directorsString;
    document.getElementById('modal-summary').textContent = "Description : " + data.long_description;
    const actorsList = data.actors;
    const actorsString = actorsList.join(', ');
    document.getElementById('modal-cast').textContent = "Casting : " + actorsString;
    document.getElementById('modal-country').textContent = "Pays : " + data.countries;
    if(data.reviews_from_critics === null){
        document.getElementById('modal-box-office-critics').textContent = "Notes des critiques : Not rated";
    }else{
        document.getElementById('modal-box-office-critics').textContent = "Notes des critiques : " + data.reviews_from_critics + "/5";
    }
    if(data.reviews_from_users === null){
        document.getElementById('modal-box-office-users').textContent = "Notes des utilisateurs : Not rated";
    }else{
        document.getElementById('modal-box-office-users').textContent = "Notes des utilisateurs : " + data.reviews_from_users + "/5";
    }
    
    
    modal.style.display = 'block';
    })
}

const fetchBestMovies = () => {
    const moviesContainer = document.getElementById('best-rated-movies');
    moviesContainer.innerHTML = ''; // Clear previous content
    fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score")
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok for best movies');
        }
        return response.json();
    })
    .then(data => {
        let movies = data.results;
        if (movies.length < 7) {
            // Faire une autre requête pour obtenir plus de films
            let urlPageTwo = data.next;
            return fetch(urlPageTwo)
                .then(response => response.json())
                .then(nextPageData => {
                    movies = movies.concat(nextPageData.results);
                    return movies.slice(0, 7); // Limiter à 7 films au total
                });
        } else {
            return movies;
        }
    })
    .then(movies => {
        movies.forEach(movie => {
            const movieImg = document.createElement('img');
            movieImg.className = 'row_poster row_posterLarge';
            movieImg.src = movie.image_url;
            movieImg.alt = movie.title;
            moviesContainer.appendChild(movieImg);

            movieImg.addEventListener('click', () => {
                displayModal(movie.id);
            });
        });
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
};


const fetchGenreMovies = (genre) => {
    let moviesContainer;
    if (genre === 'action') {
        moviesContainer = document.getElementById('action-movies');
    } else if (genre === 'comedy') {
        moviesContainer = document.getElementById('comedy-movies');
    } else if (genre === 'horror') {
        moviesContainer = document.getElementById('horror-movies');
    } else {
        console.error(`Unknown genre: ${genre}`);
        return;
    }
    moviesContainer.innerHTML = ''; // Clear previous content

    fetch(`http://localhost:8000/api/v1/titles/?genre=${genre}&sort_by=-imdb_score`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Network response was not ok for ${genre} movies`);
        }
        return response.json();
    })
    .then(data => {
        let movies = data.results;
        if (movies.length < 7) {
            // Faire une autre requête pour obtenir plus de films
            let urlPageTwo = data.next;
            return fetch(urlPageTwo)
                .then(response => response.json())
                .then(nextPageData => {
                    movies = movies.concat(nextPageData.results);
                    return movies.slice(0, 7); // Limiter à 7 films au total
                });
        } else {
            return movies;
        }
    })
    .then(movies => {
        movies.forEach(movie => {
            const movieImg = document.createElement('img');
            movieImg.className = 'row_poster';
            movieImg.src = movie.image_url;
            movieImg.alt = movie.title;

            movieImg.onerror = () => {
                movieImg.src = 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg';
            };

            moviesContainer.appendChild(movieImg);
            movieImg.addEventListener('click', () => {
                displayModal(movie.id);
            });
        });
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
};


document.addEventListener('DOMContentLoaded', (event) => {
    fetchTheBestMovie();
    fetchBestMovies();
    fetchGenreMovies("action");
    fetchGenreMovies("comedy");
    fetchGenreMovies("horror");
});
