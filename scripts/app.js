/* jshint esversion: 6 */
let submitBtn = document.querySelector('.submit-search-movie');
let userInput = document.querySelector('.search-movie');
let pageBtn = document.querySelectorAll('.page-number');

let movie;


function getMovie() {
    let valueOfInput = userInput.value;
    let api = `https://api.themoviedb.org/3/search/movie?api_key=05c32981e48de1e61d5e174e4f052daa&language=en-US&query=${valueOfInput}&page=1&include_adult=false`;
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


function fetchAllMovie() {

   for(let i = 0; i < movie.results.length; i++) {
        let div = document.getElementById('movie-append');
        let divInner = document.createElement('div');
        let parag = document.createElement('p');
        let movieTitle = movie.results[i].title;
        let movieReleaseDate = movie.results[i].release_date;
        let posterPath = movie.results[i].poster_path;
        let movieVariable = movie.results[i].vote_average;
        let imgPoster = document.createElement('img');
        let imgPath = `http://image.tmdb.org/t/p/w200/${posterPath}`;
        let movieRating = document.createElement('p');
        
        divInner.classList.add('card');
        parag.classList.add('movieTitle');
        parag.textContent = `${movieTitle} ${movieReleaseDate}`;
        if(posterPath === null) {
            imgPoster.src = '../img/NoPosterAvailable_placeholder_160x220.png';
        } else {
            imgPoster.classList.add('poster-image');
            imgPoster.src = imgPath;
        }
        movieRating.classList.add('rating');
        movieRating.textContent = `${movieVariable}`;


        divInner.appendChild(parag);
        divInner.appendChild(imgPoster);
        divInner.appendChild(movieRating);
        div.appendChild(divInner);
        
        console.log(parag);
        console.log(div);
        
   }
}

function changeMovies() {
    let div = document.getElementById('movie-append');
    div.innerHTML = '';
    
    fetchAllMovie();
}


let pageCount = 1;
function nextPage() {
    valueOfInput = userInput.value;
    if(pageCount < movie.total_pages) {
        pageCount++;
        let api = `https://api.themoviedb.org/3/search/movie?api_key=05c32981e48de1e61d5e174e4f052daa&language=en-US&query=${valueOfInput}&page=${pageCount}&include_adult=false`;
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

function previousPage() {
    valueOfInput = userInput.value;
    if(pageCount > 1) {
        pageCount--;
        let api = `https://api.themoviedb.org/3/search/movie?api_key=05c32981e48de1e61d5e174e4f052daa&language=en-US&query=${valueOfInput}&page=${pageCount}&include_adult=false`;
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

function createButtons() {
    let div = document.getElementById('pages');
    let next = document.createElement('input');
    let previous = document.createElement('input');
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
