/* jshint esversion: 6 */
let submitBtn = document.querySelector('.submit-search-movie');
let userInput = document.querySelector('.search-movie');


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
            changeMovies();
        });   
}

function fetchAllMovie() {

   for(let i = 0; i < movie.results.length; i++) {
        let div = document.getElementById('movie-append');
        let divInner = document.createElement('div');
        divInner.classList.add('card');
        let parag = document.createElement('p');
        parag.classList.add('movieTitle');
        let movieTitle = movie.results[i].title;
        let movieReleaseDate = movie.results[i].release_date;
        parag.textContent = movieTitle + '' + movieReleaseDate;
        let posterPath = movie.results[i].poster_path;
        let imgPoster = document.createElement('img');
        let imgPath = `http://image.tmdb.org/t/p/w185/${posterPath}`;
        imgPoster.src = imgPath;
        divInner.appendChild(parag);
        divInner.appendChild(imgPoster);
        div.appendChild(divInner);
        console.log(parag);
   }
        console.log(div);
}

function changeMovies() {
    let div = document.getElementById('movie-append');
    div.innerHTML = '';
    fetchAllMovie();
}


submitBtn.addEventListener('click', getMovie);
