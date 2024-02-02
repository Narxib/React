
export async function useFetchUsers(){
    const res = await fetch("http://localhost:5173/users.json")
    const users= await res.json()
    return users
}