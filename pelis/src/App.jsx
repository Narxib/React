import './App.css'
import { useState, useEffect } from "react"
import { useMovies } from "./hooks/useMovies.js"
import { Movies } from './components/Movies'
import { useSearch } from "./hooks/useSearch.js"

//const API = `https://www.omdbapi.com/?t=Star+wars&apikey=1563d084`

function App() {
  const { movies } = useMovies()
  const { search, updateSearch, error } = useSearch()

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log({ search })
  }

  const handleChange = (event) => {
    updateSearch(event.target.value)
  }

  return (
    <>
      <header className='page'>
        <h2>Movie searcher</h2>
        <form className="form" action="" onSubmit={handleSubmit}>
          <input onChange={handleChange} value={search} type="text" placeholder='Superman, Star Wars...' />
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
