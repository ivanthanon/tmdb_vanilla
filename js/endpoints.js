const Env = {
    apiKey: 'c73e7f4c643caeef3d84e4a1c798a889'
}

let page = 0;

export async function MovieList(isIncrement, genre) {
    let data = "";

    if (isIncrement) page += 1;
    else if (page > 1) page -= 1;
    else page = 1;

    await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${Env.apiKey}&language=es-Es${genre != -1 ? `&with_genres=${genre}` : ""}&page=${page}`
    )
        .then((response) => response.json())
        .then((result) => {
            data = result;
        })

    return data;
}

export async function TrailerMovie (id) {
    let data = null;
    await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${Env.apiKey}&language=es-Es`)
    .then ((response) => {
        return response.json();
    })
    .then((result) => {
        if (result.results.length > 0) {
            data = result; 
        }
    })
    
    return data;
}

export function MovieImage(imagepath) {
    return `https://image.tmdb.org/t/p/w500${imagepath}`
}

export async function GenreList() {
    let data;
    await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${Env.apiKey}&language=es-Es`
    )
        .then((response) => response.json())
        .then((result) => {
            data = result;
        });
    return data;
}

export function setPage (numberOfPage) {
    page = numberOfPage;
}