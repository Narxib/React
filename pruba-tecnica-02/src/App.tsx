import './App.css';;
import { useMemo, useState } from 'react'
import { SortBy, type User } from "./types.d"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useUsers } from './hooks/useUsers';
import { fetchUsers } from './services/users';
import { UsersList } from './components/UsersList'
import { Results } from './components/Results';



function App() {
  const { isLoading, isError, users, refetch, fetchNextPage, hasNextPage } = useUsers()

  const [colorized, setColorized] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterBySearch, setfilterBySearch] = useState<string | null>(null)

  //const originalUsers = useRef<User[]>([])



  const colorize = () => {
    setColorized(!colorized)
  }

  const sortUsers = () => {
    //const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    //setSorting(newSortingValue)
  }


  const handleDelete = (email: string) => {
    //const filteredUsers = users.filter((user) => user.email !== email)
    //setUsers(filteredUsers)
  }

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }

  const handleReset = async () => {
    await refetch()

  }



  return (
    <>
      <h2>Users Table</h2>
      <header style={{ padding: "25px", justifyItems: "space-evenly" }}>
        <button onClick={colorize}>Colorize</button>
        <button onClick={sortUsers}> {sorting === SortBy.COUNTRY ? 'No ordenar por país' : 'Ordenar por país'}</button>
        <button onClick={handleReset}>Reset users</button>
        <input placeholder="Search by country or name" onChange={(e) => { setfilterBySearch(e.target.value) }} />
      </header>
      <Results />
      {users.length > 0 &&
        <UsersList changeSorting={handleChangeSort} deleteUser={handleDelete} colorized={colorized} users={users} />}
      {isLoading && <p>Loading...</p>}
      {isError && <p>Ha habido un error </p>}
      {!isLoading && !isError && users.length === 0 && <p>No hay usuarios</p>}
      {!isLoading && !isError && <button onClick={() => void fetchNextPage()}>Cargar mas resultados</button>}
    </>
  )
}

export default App
