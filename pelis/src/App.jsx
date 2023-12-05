import './App.css'
import { useState,useRef } from "react"
import {useMovies} from "./hooks/useMovies.js"
import { Movies } from './components/Movies'

//const API = `https://www.omdbapi.com/?t=Star+wars&apikey=1563d084`


function App() {
  const {movies:mappedMovies} = useMovies()
  
  const [query,setQuery] = useState("")
  const [error,setError] = useState(null)

  const inputRef = useRef()

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log({query})
  }

  const handleChange=(event)=>{
    const newQuery = event.target.value
    setQuery(newQuery)

    if(newQuery === ""){
      setError("Cant search an empty field")
      return
    }
    setError(null)
  }

  return (
    <>
      <header className='page'>
        <h2>Movie searcher</h2>
        <form className="form" action="" onSubmit={handleSubmit}>
          <input onChange={handleChange} value={query} type="text" placeholder='Superman, Star Wars...' />
          <button type="submit">Search</button>
        </form>
        {error && <p className='error'>{error}</p>}
      </header>

      <main>
        <Movies movies={mappedMovies}/>
      </main>
    </>
  )
}

export default App
