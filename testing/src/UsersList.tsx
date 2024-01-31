import { useUsersStore } from "./store/users"
import { Card, List, ListItem, ListItemText, ListItemButton } from "@mui/material"


export const UsersList = () => {
    const users = useUsersStore(state => state.users)
    const followUser = useUsersStore(state => state.followUser)

    const handleFollow = (index: number) => {
        followUser(index)
    }

    return (
        <>
            <Card>
                <List>
                    {users.map((user, index) => (
                        <ListItem>
                            <ListItemText><h3 key={index}>{user.name}</h3></ListItemText>
                            <ListItemButton onClick={() => { handleFollow(index) }}> {user.isFollowing ? "Unfollow" : "Follow"} </ListItemButton>
                            <h3>{index}</h3>
                        </ListItem>
                    ))}
                </List>
            </Card>
        </>
    )
}