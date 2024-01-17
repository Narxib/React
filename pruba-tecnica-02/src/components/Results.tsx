import { useUsers } from "../hooks/useUsers";

export const Results = () => {
    const { users } = useUsers()
    return <h3>Showing {users.length} results</h3>
}