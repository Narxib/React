export const searchMovies = ({ search }) => {
    if (!search) return null

    return fetch(`https://www.omdbapi.com/?s=${search}&apikey=1563d084`)
        .then(res => res.json())
        .then(data => {
            return data.Search?.map(movie => ({
                id: movie.imdbID,
                title: movie.Title,
                year: movie.Year,
                poster: movie.Poster
            }))
        })
}
