import { useUsersStore } from "./store/users"
import { Card, List, ListItem, ListItemText } from "@mui/material"
import "./UsersList.css"

export const UsersList = () => {
    const users = useUsersStore(state => state.users)

    const followUser = useUsersStore(state => state.followUser)
    return (
        <>
            <Card>
                <List>
                    {users.map((user, index) => (
                        <ListItem key={user.id}>
                            <ListItemText><h3>{user.name}</h3></ListItemText>
                            <button className={user.isFollowing ? "buttonFollowing" : "buttonNotFollowing"} onClick={() => { followUser(index) }}> {user.isFollowing ? "Unfollow" : "Follow"} </button>
                        </ListItem>
                    )
                    )}
                </List>
            </Card>
        </>
    )
}