function displayTime(){
  const date = new Date();
  var hours = date.getHours();
  var min = date.getMinutes();
  var seconds = date.getSeconds();
  let session = document.getElementById('session');

  
  if (hours >= 12){
    session.innerHTML = 'PM';
  }
  else{
    session.innerHTML = 'AM';
  }
  if (hours > 12){
    hours = hours - 12;
  }
  if (min < 10) {
    min = '0' + min;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }

  document.getElementById('hours').innerHTML = hours;
  document.getElementById('minutes').innerHTML = min;
  document.getElementById('seconds').innerHTML = seconds;

 
}

const apiKey = '7b7b640161fb2ad71f2562b48443b5a4';
const generateButton = document.getElementById('generate-button');

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YjdiNjQwMTYxZmIyYWQ3MWYyNTYyYjQ4NDQzYjVhNCIsInN1YiI6IjY1MzQ2YzMxNDJkODM3MDEwYmE4YzQ0NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oY9M2GZn4beka05yifuhLsG7Eea3WnV1aa8KueyPi10'
  }
};


//Gets the latest movie's id to use for random id
function fetchID(){
  fetch('https://api.themoviedb.org/3/movie/latest', options)
  .then(response => response.json())
  .then(data => {
    const list = data;
    let number = getRandomInt(data.id);
    fetchData(number);
  })
  .catch(err => console.error(err));
}


function fetchData(num){
  fetch(`https://api.themoviedb.org/3/movie/${num}?language=en-US`, options)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const {original_title, overview, release_date, title, genres} = data;
        
        //Uses recursion to keep searching for movie that is available
        const movieImage = `http://image.tmdb.org/t/p/w300${data.poster_path}`
        
        if (data.poster_path !== null && data.adult === false){
          document.querySelector('.js-website-container').innerHTML = `
          
          <div class = "photo-div">
          <div class = "photo-div"><img class = "photo" src = "http://image.tmdb.org/t/p/w300${data.poster_path}"></div>
          <div class = "js-movie-container movie-container">
          
          <div class = "movie-inside">
          
            <div class = "movie-grid">
              
              <h2 id = "bg" class = "js-movie-header movie-header">${title}</h2>
              <p class = "movie-genres">Genres: [${getGenres(genres)}]</p>
              <h3 class = "movie-subheader">Also known as: ${original_title}</h3>
              
              <p class = "movie-overview">${overview}</p>
            </div>
          </div>
          </div>
          </div>
          `;
        }
        else {
          fetchData(getRandomInt(num));
        }
      })
      .catch(err => fetchData(getRandomInt(num)));
}

//Random int for getting id
function getRandomInt(num){
  return Math.floor(Math.random() * num);
}


//Getting list of genres
function getGenres(genreList){
  let list = [];
  if (genreList.length > 0){
    for (let i = 0; i < genreList.length; i++){
      if (i < genreList.length-1){
        list += genreList[i].name + ', ';
      }
      else{
        list += genreList[i].name;
      }
    }
  }
  else{
    list[0] = 'Not specified';
  }
  
  return list;
}

//TODO: Save movie generated into local storage and only update every day.
//Add time counter, and DONE [add placeholder image for movies that dont have images]

//Saving movie generated in local storage




// function generateRandomColor()
// {
//   var randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
//   if(randomColor.length != 7) {
//     randomColor = generateRandomColor();
//   }
//   return randomColor;
//   // The random color will be freshly served
// }

// let titleElement = document.querySelector('.js-color-changer');
// let textElement = document.querySelector('.js-movie-header');
// let backgroundElement = document.querySelector('.js-movie-container');

// window.setInterval(function(){
//   let randomColor = generateRandomColor();
//   titleElement.style.color = randomColor;
// }, 4000);


setInterval(() => {
  displayTime();
}, 1000);

generateButton.addEventListener('click', () => {
  fetchData(getRandomInt(1500000));
});


function loadMovieFromStorage(){
  const savedMovie = localStorage.getItem('id');
  if (savedMovie){
    const movie = JSON.parse(savedMovie);
    fetchData(parseInt(JSON.parse(savedMovie)));
  }
}

loadMovieFromStorage();
