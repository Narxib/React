import { type User } from "../src/types"
export const UserList = async () => {
    const data = await fetch(` http://localhost:5173/users.json`)
    const json: User[] = await data.json()

    return (
        <main>
            {json.map((user: User, index: number) => (
                <h1 key={index}>{user.name}</h1>
            ))}
        </main>
    )
}