import results from "../../movies/results.json"
import noresults from "../../movies/no-results.json"

export function useMovies() {
  const movies = results.Search

  const mappedMovies = movies?.map(movie => ({
    id: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    poster: movie.Poster
  }))
  return ({ movies: mappedMovies })
}