import './App.css'
import { useEffect, useRef, useState } from 'react'
import {type User} from "./types"
import { UsersList } from './components/UsersList'

function App () {
  const [users, setUsers] = useState<User[]>([])
  const [colorized,setColorized] = useState(false)
  const [sortByCountry,setSortByCountry] = useState(false)
  const [filterByCountry,setFilterByCountry] = useState<string|null>(null)
  const originalUsers = useRef<User[]>([])

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then(res => res.json())
      .then(usersArray => { setUsers(usersArray.results)
         originalUsers.current = usersArray.results }).catch(err => { console.log(err) })
  }, [])

  const colorize=()=>{
    setColorized(!colorized)
  }

  const sortUsers = ()=>{
    setSortByCountry(prevState =>!prevState)
  }

  const filteredUsers =  typeof filterByCountry === "string" && filterByCountry.length > 0
  ? users.filter((user)=>{
    return user.location.country.toLowerCase().includes(filterByCountry.toLowerCase())
  }):users

  const handleDelete = (email:string)=>{
    const filteredUsers = users.filter((user)=> user.email!==email)
    setUsers(filteredUsers)
    }

    const handleReset = () =>{
      setUsers(originalUsers.current)
    }
  

  const sortedUsers = sortByCountry? filteredUsers.toSorted((a,b)=>{
    return a.location.country.localeCompare(b.location.country)
  }) : filteredUsers

  return (
    <>
      <h2>Users Table</h2>
      <header style={{padding:"25px",justifyItems:"space-evenly"}}>
        <button onClick={colorize}>Colorize</button>
        <button onClick={sortUsers}>{!sortByCountry ? "Ordenar por pais":"No ordenar por por pais"}</button>
        <button onClick={handleReset}>Reset users</button>
        <input placeholder="Filter by country" onChange={(e)=>{setFilterByCountry(e.target.value);console.log("SEARCHING:", e.target.value)}}/>
      </header>
      <UsersList deleteUser={handleDelete} colorized={colorized} users={sortedUsers}/>
    </>
  )
}

export default App
