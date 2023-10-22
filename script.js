const apiKey = '7b7b640161fb2ad71f2562b48443b5a4';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YjdiNjQwMTYxZmIyYWQ3MWYyNTYyYjQ4NDQzYjVhNCIsInN1YiI6IjY1MzQ2YzMxNDJkODM3MDEwYmE4YzQ0NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oY9M2GZn4beka05yifuhLsG7Eea3WnV1aa8KueyPi10'
  }
};

//Gets the latest movie's id to use for random id
fetch('https://api.themoviedb.org/3/movie/latest', options)
  .then(response => response.json())
  .then(data => {
    const list = data;
    const num = getRandomInt(data.id);

    fetchData(num);
  })
  .catch(err => console.error(err));


function fetchData(num){
  fetch(`https://api.themoviedb.org/3/movie/${num}?language=en-US`, options)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const {original_title, overview, release_date, title, genres} = data;
        
        //Uses recursion to keep searching for movie that is available
        const movieImage = `http://image.tmdb.org/t/p/w300${data.poster_path}`
        
        if (title !== undefined && data.adult === false){
          document.querySelector('.js-website-container').innerHTML = `
          
          <div class = "photo-div">
          <div class = "photo-div"><img class = "photo" src = "http://image.tmdb.org/t/p/w300${data.poster_path}"></div>
          <div class = "js-movie-container movie-container">
          
          <div class = "movie-inside">
          
            <div class = "movie-grid">
   
              <div class = "photo-div"><h2 id = "bg" class = "js-movie-header movie-header">${title}</h2></div>
              <div class = "photo-div"><p class = "movie-genres">Genres: [${getGenres(genres)}]</p></div>
              <div class = "photo-div"><h3 class = "movie-subheader">Also known as: ${original_title}</h3></div>
              
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
function getRandomInt(num){
  return Math.floor(Math.random() * num);
}

function getGenres(genreList){
  let list = [];
  for (let i = 0; i < genreList.length; i++){
    if (i < genreList.length-1){
      list += genreList[i].name + ', ';
    }
    else{
      list += genreList[i].name;
    }
  }
  return list;
}


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


