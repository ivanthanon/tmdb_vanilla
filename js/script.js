let incrementBtn = document.querySelector(".btnIncrement")
let decrementBtn = document.querySelector(".btnDecrement")
let container = document.querySelector(".container")
let pages = document.querySelector(".pages");
let genreFilter = -1;
let genreList = document.querySelector("#genrelist");

import { MovieList, MovieImage, setPage, GenreList, TrailerMovie } from "./endpoints.js";

async function createMovies(isIncrement, genreFilter) {
    await MovieList(isIncrement, genreFilter).then((movies) => {
        pages.textContent = `Page ${movies.page} of ${movies.total_pages}`;

        movies.results.forEach((movie) => {
            let article = document.createElement("article");
            let header = document.createElement("header");
            let footer = document.createElement("footer");
            let img = document.createElement("img");
            let span = document.createElement("span");

            img.setAttribute("src", MovieImage(movie.poster_path));
            span.textContent = movie.title;
            
            addTrailer(img, movie.id);

            article.appendChild(header.appendChild(img));
            article.appendChild(footer.appendChild(span));
            container.appendChild(article);
        });
    });
}

async function addTrailer(img, id) {
    let trailer = await TrailerMovie(id);
    let youtubeKey;

    if (trailer) {
        youtubeKey = trailer.results[0].key;
        img.setAttribute("data-video-link", youtubeKey);
    }

    img.addEventListener("click", (e) => {
        if (img.getAttribute("data-video-link") != undefined) {
            window.open(`https://www.youtube.com/watch?v=${youtubeKey}`, '_blank')
        } else {
            alert("No existe trailer de esta película");
        }
    })
}

function cleanMovies () {
    container.innerHTML = "";
}

async function createGenres() {
    let data;
    await GenreList().then((genres) => {
        data = genres.genres;
    });

    data.forEach((genre) => {
        let span = document.createElement("span");
        span.setAttribute("id", genre.id);
        span.textContent = genre.name;
        span.addEventListener("click", (e) => {
            cleanMovies();
            genreFilter = e.target.getAttribute("id");
            setPage(0);
            createMovies(true, genreFilter);
        });
        genreList.appendChild(span);
    });
}


function loadBtns() {
    incrementBtn.addEventListener("click", () => {
        cleanMovies();
        createMovies(false, genreFilter);
    });

    decrementBtn.addEventListener("click", () => {
        cleanMovies();
        createMovies(true, genreFilter);
    });
}

loadBtns();
createGenres();
createMovies(true);

