import './App.css'
import { FetchUsers } from './FetchUsers.tsx'
import { useEffect, useState } from 'react'
import { UsersList } from './UsersList.tsx'
import { useUsersStore } from './store/users'
import { DevTools } from './DevTools.tsx'
import { Search } from './Search.tsx'


function App() {
  const users = useUsersStore(state => state.users)

  return (
    <>
      {users.length > 0 && <DevTools />}
      {<Search />}
      {users.length === 0 && <FetchUsers />}
      {users.length > 0 && <UsersList />}
    </>
  )
}

export default App