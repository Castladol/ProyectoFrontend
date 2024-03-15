//Vars
const optionsmovie = {
  url: "https://api.themoviedb.org/3/",
  endPointMovies: "/movie/now_playing",
  page: 1,
};

//Get items by carousel
const headersmovie = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNDVhMWMxODg1OWE5MTU5ODA0OTMzMzY5ZmZlMmVkZiIsInN1YiI6IjY1NDFiOTU5OWNjNjdiMDBmYzdkYTc1ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NUuowspbMwuqmeX4Wc4wEq4NZcC8_OD_8s3POQGykMI",
  },
};

//Get items by carousel
const getListMovies = () => {

  fetch(
    optionsmovie.url + optionsmovie.endPointMovies + "?language=es-CO&page=" + optionsmovie.page,
    headersmovie
  )
    .then((response) => response.json())
    .then((response) => {
      var template = "";

      response.results.forEach(movie => {
        template += `<div class="card-movie col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 m-4" onclick="location.href='./movie.html?id=${movie.id}'">
                       <div class="card">
                         <img loading="lazy" src="https://image.tmdb.org/t/p/original${movie.poster_path}" class="card-img-top" alt="${movie.original_title}">
                         <div class="card-body">
                           <h5 class="card-title">${movie.original_title}</h5>
                         </div>
                       </div>
                     </div>`;
      });

      const element = document.querySelector("#list-movies");
      element.innerHTML = "";
      element.innerHTML = template;
    })
    .catch((err) => {
      console.error(err);
      var alertNode = document.querySelector("error-get-list-movies");
      var alert = bootstrap.Alert.getInstance(alertNode);
      alert.show();
    });
};

//Init list movies
getListMovies();

//Next page
const nextPage = () => {
  optionsmovie.page++;
  getListMovies();
};

//Prev page
const prevPage = () => {
  if (optionsmovie.page > 1) {
    optionsmovie.page--;
    getListMovies();
  }
};
