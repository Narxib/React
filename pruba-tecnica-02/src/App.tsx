import './App.css'
import { useEffect, useState } from 'react'
import {type User} from "./types"
import { UsersList } from './components/UsersList'

function App () {
  const [users, setUsers] = useState<User[]>([])
  const [colorized,setColorized] = useState(false)
  const [sortByCountry,setSortByCountry] = useState(false)

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then(res => res.json())
      .then(usersArray => { setUsers(usersArray.results) }).catch(err => { console.log(err) })
  }, [])

  const colorize=()=>{
    setColorized(!colorized)
  }

  const sortUsers = ()=>{
    setSortByCountry(prevState =>!prevState)
  }

  const sortedUsers = sortByCountry? users.toSorted((a,b)=>{
    return a.location.country.localeCompare(b.location.country)
  }) : users

  return (
    <>
      <h2>Users Table</h2>
      <header style={{paddingBottom:"50px"}}>
        <button onClick={colorize}>Colorize</button>
        <button onClick={sortUsers}>{sortByCountry ? "Ordenar por pais":"No ordenar por por pais"}</button>
      </header>
  
      <UsersList colorized={colorized} users={sortedUsers}/>
    </>
  )
}

export default App
