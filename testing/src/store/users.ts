/* eslint-disable react-hooks/rules-of-hooks */
import {create} from "zustand"
import { persist} from "zustand/middleware"
import {useFetchUsers} from "../hooks/useFetchUsers.ts"
import { User } from "./types"


interface State{
    users:User[]
    fetchUsers:()=>Promise<void>,
    followUser:(index:number)=>void
    massiveUnfollow:()=>void
    massiveFollow:()=>void
    sortUsers:(users:User[])=>void
    reset:()=>void
}

export const useUsersStore = create<State>()(persist((set,get)=>{
    return{
        users:[],
        fetchUsers: async ()=>{
            const users = await useFetchUsers()
            set({users})
        },
        followUser: (index)=>{
            const {users} = get()
            const newUsers = structuredClone(users)
            const currentValue = newUsers[index].isFollowing
            newUsers[index].isFollowing=!currentValue
            set({users:newUsers})
        },
        massiveUnfollow:()=>{
            const {users} = get()
            const newUsers = structuredClone(users)
            newUsers.forEach((user)=>{
                user.isFollowing=false
            })
            set({users:newUsers})
        },
        massiveFollow:()=>{
            const users = get().users
            const newUsers = structuredClone(users)
            newUsers.forEach((user)=>{
                user.isFollowing=true
            })
            set({users:newUsers})
        },
        sortUsers:(sortedUsers:User[])=>{
            set({users:sortedUsers})
        },
        reset:()=>{
            set({users:[]})
        }
    }},{name:"users"}
))