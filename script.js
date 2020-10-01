"use strict";

/*
    Put your JavaScript here
*/

function app() {
  const listDiv = document.createElement("div");
  document.body.appendChild(listDiv);
  listDiv.classList.add("list");
  const posterDiv = document.createElement("div");
  document.body.appendChild(posterDiv);
  posterDiv.classList.add("poster");

  const movieListBtn = document.createElement("select");
  movieListBtn.id = "select";
  listDiv.appendChild(movieListBtn);
  function getMovies() {
    fetch("http://www.omdbapi.com/?apikey=62e525bd&s=batman")
      .then((res) => res.json())
      .then((batmanMovies) => {
        let movieListArr = batmanMovies.Search;
        console.log(movieListArr);

        movieListArr.forEach((movie) => {
          const movieTitle = document.createElement("option");
          movieTitle.innerText = movie.Title;
          movieTitle.value = movie.Poster;
          movieListBtn.appendChild(movieTitle);
        });
      })

      .catch((error) => console.log(error));
  }

  function displayMovieDetails(e) {
    posterDiv.innerHTML = "";
    const poster = document.createElement("img");
    poster.src = e.target.value;
    posterDiv.appendChild(poster);
  }
  movieListBtn.addEventListener("change", displayMovieDetails);

  getMovies();
}
app();
