import './App.css'
import { FetchUsers } from './FetchUsers.tsx'
import { useUsersStore } from './store/users'


function App() {
  const users = useUsersStore(state => state.users)

  return (
    <>
      {users.length < 0 && <FetchUsers />}
      {users.length === 0 && <FetchUsers />}
    </>
  )
}

export default App