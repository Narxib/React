import './App.css';;
import { useMemo, useRef, useState } from 'react'
import { SortBy, type User } from "./types.d"
import { useInfiniteQuery } from "@tanstack/react-query"
import { UsersList } from './components/UsersList'

function App() {
  const fetchUsers = ({ pageParam }: { pageParam: number }) => {
    return fetch(`https://randomuser.me/api/?results=10&seed=brian&page=${pageParam}`)
      .then(res => {
        return res.json()
      })
      .then(json => {
        const nextCursor = Number(json.info.page)
        return {
          users: json.results,
          nextCursor
        }
      })
  }

  const { isLoading, isError, data, refetch, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["users"],
    queryFn: ({ pageParam = 1 }) => fetchUsers(pageParam),
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor
  })

  const users = data

  const [colorized, setColorized] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterBySearch, setfilterBySearch] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  //const originalUsers = useRef<User[]>([])



  const colorize = () => {
    setColorized(!colorized)
  }

  const sortUsers = () => {
    //const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    //setSorting(newSortingValue)
  }

  const filteredUso(() => {
    console.log('caers = useMemlculate filteredUsers')
    return filterBySearch != null && filterBySearch.length > 0
      ? users.filter(user => {
        return user.location.country.toLowerCase().includes(filterBySearch.toLowerCase())
      })
      : users
  }, [users, filterBySearch])

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
      {isLoading && <p>Loading...</p>}
      {isError && <p>Ha habido un error </p>}
      {!isLoading && !isError && users.length === 0 && <p>No hay usuarios</p>}
      {!isLoading && !isError && <button onClick={() => setCurrentPage(currentPage + 1)}>Cargar mas resultados</button>}
    </>
  )
}

export default App
