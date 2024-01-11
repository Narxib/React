import './App.css'
import { useEffect, useMemo, useRef, useState } from 'react'
import {SortBy, type User} from "./types.d"
import { UsersList } from './components/UsersList'

function App () {
  const [users, setUsers] = useState<User[]>([])
  const [colorized,setColorized] = useState(false)
  const [sorting,setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterBySearch,setfilterBySearch] = useState<string|null>(null)
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
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY :SortBy.NONE
    setSorting(newSortingValue)
  }

  const filteredUsers = useMemo(() => {
    console.log('calculate filteredUsers')
    return filterBySearch != null && filterBySearch.length > 0
      ? users.filter(user => {
        return user.location.country.toLowerCase().includes(filterBySearch.toLowerCase())
      })
      : users
  }, [users, filterBySearch])
 
  const handleDelete = (email:string)=>{
    const filteredUsers = users.filter((user)=> user.email!==email)
    setUsers(filteredUsers)
    }

  const handleChangeSort = (sort:SortBy)=>{
    setSorting(sort)
  }

    const handleReset = () =>{
      setUsers(originalUsers.current)
    }
  

    const sortedUsers = useMemo(() => {
      console.log('calculate sortedUsers')
  
      if (sorting === SortBy.NONE) return filteredUsers
  
      const compareProperties: Record<string, (user: User) => any> = {
        [SortBy.COUNTRY]: user => user.location.country,
        [SortBy.NAME]: user => user.name.first,
        [SortBy.LAST]: user => user.name.last
      }
  
      return filteredUsers.toSorted((a, b) => {
        const extractProperty = compareProperties[sorting]
        return extractProperty(a).localeCompare(extractProperty(b))
      })
    }, [filteredUsers, sorting])
  
  return (
    <>
      <h2>Users Table</h2>
      <header style={{padding:"25px",justifyItems:"space-evenly"}}>
        <button onClick={colorize}>Colorize</button>
        <button onClick={sortUsers}> {sorting === SortBy.COUNTRY ? 'No ordenar por país' : 'Ordenar por país'}</button>
        <button onClick={handleReset}>Reset users</button>
        <input placeholder="Search by country or name" onChange={(e)=>{setfilterBySearch(e.target.value);console.log("SEARCHING:", e.target.value)}}/>
      </header>
      <UsersList changeSorting={handleChangeSort} deleteUser={handleDelete} colorized={colorized} users={sortedUsers} />
    </>
  )
}

export default App
