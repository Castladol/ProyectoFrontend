//Vars
const url = new URL(location.href);
const params = url.searchParams;
//const config = null;

//Read Config file
//fetch('../config/config.json')
//    .then((response) => response.json())
//    .then((json) => config = json);


const optionmovie = {
  url: "https://api.themoviedb.org/3/",
  endPoint: "/movie",
  id: params.get("id"),
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
fetch(
  optionmovie.url +
    optionmovie.endPoint +
    "/" +
    optionmovie.id +
    "?language=es-CO",
  headersmovie
)
  .then((response) => response.json())
  .then((response) => {
    // Set Title
    const elemTitle = document.querySelector("#title-movie");
    elemTitle.innerHTML = "";
    elemTitle.innerHTML = "<strong>" + response.title + "</strong>";
    // Set Image
    const elemImage = document.querySelector("#image-movie");
    elemImage.style.backgroundImage = `url('https://image.tmdb.org/t/p/original${response.backdrop_path}')`;
    elemImage.style.backgrounPosition = "cover";
    elemImage.style.backgroundSize = "cover";
    elemImage.style.width = "100vw";
    elemImage.style.height = "100vh";
    // Set Description
    const elemDescription = document.querySelector("#description-movie");
    elemDescription.innerHTML = "";
    elemDescription.innerHTML = response.overview;
  })
  .catch((err) => {
    var alertNode = document.querySelector("#error-get-movie");
    var alert = bootstrap.Alert.getInstance(alertNode);
    alert.show();
  });

//Get items by show photos movie
fetch(
  optionmovie.url + optionmovie.endPoint + "/" + optionmovie.id + "/images",
  headersmovie
)
  .then((response) => response.json())
  .then((response) => {
    let template = "";
    response.backdrops.forEach((elem, index) => {
      template += `<div class="carousel-item ${index === 1 ? "active" : ""}">
                      <img src="https://image.tmdb.org/t/p/original${
                        elem.file_path
                      }" class="d-block w-100" >
                   </div>`;
    });

    const elemPhotos = document.querySelector("#photos-movie");
    elemPhotos.innerHTML = "";
    elemPhotos.innerHTML = template;
  })
  .catch((err) => {
    var alertNode = document.querySelector("#error-get-photos-movie");
    var alert = bootstrap.Alert.getInstance(alertNode);
    alert.show();
  });
