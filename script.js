"use strict";

/*
    Put your JavaScript here
*/

function createUI() {
  const listDiv = document.createElement("div");
  document.body.appendChild(listDiv);
  listDiv.classList.add("list");
  const posterDiv = document.createElement("div");
  document.body.appendChild(posterDiv);
  posterDiv.classList.add("poster");
  posterDiv.id = "poster-div";

  const movieListBtn = document.createElement("select");
  movieListBtn.id = "select";
  listDiv.appendChild(movieListBtn);

  const choosePropmt = document.createElement("option");
  choosePropmt.innerText = "---Choose a movie---";
  choosePropmt.setAttribute("selected", "selected");
  movieListBtn.appendChild(choosePropmt);
}

function getMoviesList() {
  fetch("http://www.omdbapi.com/?apikey=62e525bd&s=batman")
    .then((res) => res.json())
    .then((batmanMovies) => {
      let movieListArr = batmanMovies.Search;

      movieListArr.forEach((movie) => {
        const movieTitle = document.createElement("option");
        movieTitle.innerText = movie.Title;

        document.getElementById("select").appendChild(movieTitle);
      });
      document
        .getElementById("select")
        .addEventListener("change", displayMovieDetails);
    })

    .catch((error) => console.log(error));
}

function displayMovieDetails(e) {
  document.getElementById("poster-div").innerHTML = "";
  fetch(`http://www.omdbapi.com/?apikey=62e525bd&t=${e.target.value}`)
    .then((res) => res.json())
    .then((batmanMovie) => {
      document.getElementById("poster-div").innerHTML = `
            <img class = "poster" src="${batmanMovie.Poster}">
            <h3 class="details">${batmanMovie.Title}</h3>
            <h3 class="details">Directed By : ${batmanMovie.Director}</h3>
            <h4 class="details">Year : ${batmanMovie.Year}</h4>
            <p class="details"> Plot : ${batmanMovie.Plot}</p>
            `;
    });
}

window.addEventListener("load", getMoviesList);
window.addEventListener("load", createUI);
