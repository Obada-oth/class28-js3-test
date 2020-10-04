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

  const choosePropmt = document.createElement("option");
  choosePropmt.innerText = "---Choose a movie---";
  choosePropmt.setAttribute("selected", "selected");
  movieListBtn.appendChild(choosePropmt);

  function getMovies() {
    fetch("http://www.omdbapi.com/?apikey=62e525bd&s=batman")
      .then((res) => res.json())
      .then((batmanMovies) => {
        console.log(batmanMovies);
        let movieListArr = batmanMovies.Search;
        console.log(movieListArr);

        movieListArr.forEach((movie) => {
          const movieTitle = document.createElement("option");
          movieTitle.innerText = movie.Title;
          fetch(`http://www.omdbapi.com/?apikey=62e525bd&i=${movie.imdbID}`)
            .then((res) => res.json())
            .then((batmanMovie) => {
              console.log(batmanMovie);
              movieTitle.value = `
            <img class = "poster" src="${batmanMovie.Poster}">
            <h3 class="details">${batmanMovie.Title}</h3>
            <h3 class="details">Directed By : ${batmanMovie.Director}</h3>
            <h4 class="details">Year : ${batmanMovie.Year}</h4>
            <p class="details"> Plot : ${batmanMovie.Plot}</p>
            `;
            });

          movieListBtn.appendChild(movieTitle);
        });
      })

      .catch((error) => console.log(error));
  }

  function displayMovieDetails(e) {
    posterDiv.innerHTML = "";
    posterDiv.innerHTML = e.target.value;
  }
  movieListBtn.addEventListener("change", displayMovieDetails);

  getMovies();
}
window.addEventListener("load", app);
