import './App.css';;
import { useEffect, useMemo, useRef, useState } from 'react'
import { SortBy, type User } from "./types.d"
import { UsersList } from './components/UsersList'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [colorized, setColorized] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterBySearch, setfilterBySearch] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const originalUsers = useRef<User[]>([])

  const fetchUsers = (page: Number) => {
    return fetch(`https://randomuser.me/api/?results=10&seed=brian&page=${currentPage}`)
      .then(res => { return res.json() })
  }
  console.log("ceasdasdas   d")
  useEffect(() => {
    setLoading(true)
    fetchUsers(currentPage)
      .then(usersArray => {
        setUsers(prevUsers => {
          const newUsers = prevUsers.concat(usersArray.results)
          originalUsers.current = newUsers
          return newUsers
        })

      }).catch(err => { console.log(err); setError(err) })
      .finally(() => {
        setLoading(false)
      })
  }, [currentPage])

  const colorize = () => {
    setColorized(!colorized)
  }

  const sortUsers = () => {
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
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

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email)
    setUsers(filteredUsers)
  }

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }

  const handleReset = () => {
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
      <header style={{ padding: "25px", justifyItems: "space-evenly" }}>
        <button onClick={colorize}>Colorize</button>
        <button onClick={sortUsers}> {sorting === SortBy.COUNTRY ? 'No ordenar por país' : 'Ordenar por país'}</button>
        <button onClick={handleReset}>Reset users</button>
        <input placeholder="Search by country or name" onChange={(e) => { setfilterBySearch(e.target.value); console.log("SEARCHING:", e.target.value) }} />
      </header>
      {users.length > 0 &&
        <UsersList changeSorting={handleChangeSort} deleteUser={handleDelete} colorized={colorized} users={sortedUsers} />}
      {loading && <p>Loading...</p>}
      {error && <p>Ha habido un error </p>}
      {!error && users.length === 0 && <p>No hay usuarios</p>}
      {!loading && !error && <button onClick={() => setCurrentPage(currentPage + 1)}>Cargar mas resultados</button>}
    </>
  )
}

export default App
