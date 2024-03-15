  //Vars
  const optiontrendings = {
    url: "https://api.themoviedb.org/3/",
    endPointTrending: "/trending/movie/day",
  };

  //Get items by carousel
  const headerstrending = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNDVhMWMxODg1OWE5MTU5ODA0OTMzMzY5ZmZlMmVkZiIsInN1YiI6IjY1NDFiOTU5OWNjNjdiMDBmYzdkYTc1ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NUuowspbMwuqmeX4Wc4wEq4NZcC8_OD_8s3POQGykMI",
    },
  };

  //Get items by carousel
  fetch(
    optiontrendings.url + optiontrendings.endPointTrending + "?language=es-CO",
    headerstrending
  )
    .then((response) => response.json())
    .then((response) => {
      var template = "";

      for (let i = 0; i < 5; i++) {
        template += `
          <div class="carousel-item ${i == 0 ? "active" : ""}">
              <img loading="lazy" src="https://image.tmdb.org/t/p/original${response.results[i].backdrop_path}" class="d-block w-100" alt="${response.results[i].original_title}" />
              <div id="card-into-trending" class="carousel-card text-white" >
                <div class="card-body">
                  <h5 class="card-title"><strong>${response.results[i].title}</strong></h5>
                  <h6 class="card-subtitle mb-2 text-body-secondary">${response.results[i].overview}</h6>
                  <a onclick="location.href='./movie.html?id=${response.results[i].id}'" class=" card-link btn btn-outline-success">Ver Mas</a>
                </div>
              </div>
          </div>`;
      }

      //const element = document.getElementsByClassName("carousel-inner");
      const element = document.querySelector(".carousel-inner");
      element.innerHTML = "";
      element.innerHTML = template;
    })
    .catch((err) => {
      console.error(err);
      var alertNode = document.querySelector("error-get-top-movies");
      var alert = bootstrap.Alert.getInstance(alertNode);
      alert.show();
    });
