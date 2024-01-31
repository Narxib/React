import { useUsersStore } from "./store/users"

export const FetchUsers = () => {
    const fetchUsers = useUsersStore(state => state.fetchUsers)

    const handleFetch = () => {
        fetchUsers()
    }

    return (
        <>
            <h1>Users list</h1>
            <button onClick={handleFetch}>Fetch users</button>
        </>
    )
}