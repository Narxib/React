import noresults from "../../movies/no-results.json"
import movies from "../../movies/results.json"

function ListOfMovies({ movies }) {
  return (
    <ul className="movies">
      {
        movies.map(movie => (
          <li className="movie" key={movie.id}>
            <h3>{movie.title}</h3>
            <h3>{movie.year}</h3>
            <img src={movie.poster} alt={movie.Title} />
          </li>
        ))
      }
    </ul>
  )
}


function NoResults() {
  return (
    <h1>No Results</h1>
  )
}

export function Movies({ movies }) {
  const hasResult = movies?.length > 0

  return (hasResult ? <ListOfMovies movies={movies} /> : <NoResults />)

}