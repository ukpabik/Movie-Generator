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
        if (title !== undefined && data.adult === false){
          document.querySelector('.js-movie-container').innerHTML = `
          
          <img class = "photo" src = "http://image.tmdb.org/t/p/w300${data.poster_path}">
          <div class = "movie-inside">
            <div class = "movie-grid">
              <h2 class = "movie-header">${title} <p class = "movie-genres">Genres: [${genres[0].name}]</p></h2>
              <h3>Also known as: ${original_title}</h3>
              <p class = "movie-overview">${overview}</p>
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

