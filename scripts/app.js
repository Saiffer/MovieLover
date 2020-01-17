/* jshint esversion: 6 */
const submitBtn = document.querySelector('.submit-search-movie');
const userInput = document.querySelector('.search-movie');
const pageBtn = document.querySelectorAll('.page-number');
const myKey = config.API_KEY;
let movie;

//Initial API call to get first 20 movies rendered on the page
function getMovie() {
    let valueOfInput = userInput.value;
    let api = `https://api.themoviedb.org/3/search/movie?api_key=${myKey}&language=en-US&query=${valueOfInput}&page=1&include_adult=false`;
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data
        })
        .then(function(data){
            movie = data;
            console.log(movie);
            createButtons();
            changeMovies();
        });   
}


//Loop that saves 20 movies(maximum allowed) and creates html elements for them
function fetchAllMovie() {
   for(let i = 0; i < movie.results.length; i++) {
        const div = document.getElementById('movie-append');
        const divInner = document.createElement('div');
        const parag = document.createElement('p');
        const movieTitle = movie.results[i].title;
        const movieReleaseDate = movie.results[i].release_date;
        const posterPath = movie.results[i].poster_path;
        const movieVariable = movie.results[i].vote_average;
        const imgPoster = document.createElement('img');
        const imgPath = `http://image.tmdb.org/t/p/w200/${posterPath}`;
        const movieRating = document.createElement('p');
        
        divInner.classList.add('card');
        parag.classList.add('movieTitle');
        parag.textContent = `${movieTitle}`;
        if(posterPath === null) {
            imgPoster.src = '../img/NoPosterAvailable_placeholder_160x220.png';
        } else {
            imgPoster.classList.add('poster-image');
            imgPoster.src = imgPath;
        }
        movieRating.classList.add('rating');
        movieRating.textContent = `${movieVariable} ${movieReleaseDate}`;


        divInner.appendChild(parag);
        divInner.appendChild(imgPoster);
        divInner.appendChild(movieRating);
        div.appendChild(divInner);
        
        console.log(parag);
        console.log(div);   
   }
}


//Makes possible to replace movies on every search query
function changeMovies() {
    const div = document.getElementById('movie-append');
    div.innerHTML = '';
    
    fetchAllMovie();
}


//Makes another API call to change page and render NEXT 20 movies
let pageCount = 1;
function nextPage() {
    valueOfInput = userInput.value;
    if(pageCount < movie.total_pages) {
        pageCount++;
        let api = `https://api.themoviedb.org/3/search/movie?api_key=${myKey}&language=en-US&query=${valueOfInput}&page=${pageCount}&include_adult=false`;
        fetch(api)
    .then(function(response){
        let data = response.json();
        return data
    })
    .then(function(data){
        movie = data;
        console.log(api);
        console.log(movie);
        changeMovies();
    }); 
}
}

//Makes another API call to change page on previous and render PREVIOUS 20 movies
function previousPage() {
    valueOfInput = userInput.value;
    if(pageCount > 1) {
        pageCount--;
        let api = `https://api.themoviedb.org/3/search/movie?api_key=${myKey}&language=en-US&query=${valueOfInput}&page=${pageCount}&include_adult=false`;
        fetch(api)
    .then(function(response){
        let data = response.json();
        return data
    })
    .then(function(data){
        movie = data;
        console.log(api);
        console.log(movie);
        changeMovies();
    }); 
}
}

//Creating buttons for pagination NEXT and PREVIOUS
function createButtons() {
    const div = document.getElementById('pages');
    const next = document.createElement('input');
    const previous = document.createElement('input');
    next.classList.add('next-previous_button');
    previous.classList.add('next-previous_button');
    next.type = 'button';
    previous.type = 'button';
    next.value = 'NEXT';
    previous.value = 'PREVIOUS';
    div.appendChild(next);
    div.appendChild(previous);
    next.addEventListener('click', nextPage);
    previous.addEventListener('click', previousPage);
}



submitBtn.addEventListener('click', getMovie);
