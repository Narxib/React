import { useEffect } from "react"

export default function Search ({routeParams}){
    const data = []
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzJiYjU4YzMxYTg1N2E2MDhiZTRhNDM5NGY3MGYzYSIsInN1YiI6IjY1YTdhZmNmMzg3NjUxMDEzMDFhNWJhYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ONWfJrPgSHkL-hLvjPZgXg2sZIVqReFq8eNynpH5FKA'
        }}

    useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/search/movie?query=${routeParams.query}&include_adult=false&language=en-US&page=1}`,options)
        .then(res=>res.json())
        .then(movies=>data.push(movies.results))
        console.log(data)
    })

    return(
        <>
        <h1>Has buscado {routeParams.query}</h1>   
        </>

    )
}