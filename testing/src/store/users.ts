import {create} from "zustand"
import { User } from "./types"


interface State{
    users:User[]
    fetchUsers:()=>Promise<void>,
    followUser:(index:number)=>void
}

export const useUsersStore = create<State>((set,get)=>{
    return{
        users:[],
        fetchUsers: async ()=>{
            const res = await fetch("http://localhost:5173/users.json")
            const users= await res.json()
            set({users})
        },
        followUser: (index)=>{
            const users = get().users
            console.log(users)
            const newUsers = structuredClone(users)
            newUsers[index].isFollowing=true
        }
    }
})