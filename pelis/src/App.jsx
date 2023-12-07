import './App.css'
import { useState, useEffect, useCallback } from "react"
import debounce from 'just-debounce-it'
import { useMovies } from "./hooks/useMovies.js"
import { Movies } from './components/Movies'
import { useSearch } from "./hooks/useSearch.js"

//const API = `https://www.omdbapi.com/?t=Star+wars&apikey=1563d084`

function App() {
  const [sort, setSort] = useState(false)
  const { search, updateSearch, error } = useSearch()
  const { movies, getMovies } = useMovies({ search, sort })

  const debouncedGetMovies = useCallback(
    debounce(search => {
      getMovies({ search })
    }, 500), [])

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(event.target.value)
    debouncedGetMovies(newSearch)
  }

  const handleSort = () => {
    setSort(!sort)
  }

  return (
    <>
      <header className='page'>
        <h2>Movie searcher</h2>
        <form className="form" action="" onSubmit={handleSubmit}>
          <input onChange={handleChange} value={search} type="text" placeholder='Superman, Star Wars...' />
          <input type="checkbox" onChange={handleSort} checked={sort} />
          <button type="submit">Search</button>
        </form>
        {error && <p className='error'>{error}</p>}
      </header>

      <main>
        <Movies movies={movies} />
      </main>
    </>
  )
}

export default App
