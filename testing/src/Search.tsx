
import { Input } from "@mui/material"
import { useUsersStore } from "./store/users"

export const Search = () => {
    const users = useUsersStore(state => state.users)
    const sort = useUsersStore(state => state.sortUsers)
    const fetchUsers = useUsersStore(state => state.fetchUsers)

    const handleChange = (event) => {
        const newSearch = event.target.value.toString()
        if (newSearch == "") fetchUsers()
        const sorted = users.filter((user) => user.name.toLocaleLowerCase().startsWith(newSearch.toLocaleLowerCase()))
        console.log(sorted)
        sort(sorted)
    }


    return (
        <>
            <Input onChange={handleChange} type="searchbox" placeholder="Search user"></Input>
        </>
    )
}