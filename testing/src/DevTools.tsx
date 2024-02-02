import { useUsersStore } from "./store/users"
import { useState } from "react";
import Switch from "react-switch";
import "./App.css"

export const DevTools = () => {
    const massiveUnfollow = useUsersStore(state => state.massiveUnfollow)
    const massiveFollow = useUsersStore(state => state.massiveFollow)
    const reset = useUsersStore(state => state.reset)
    const [checked, setChecked] = useState(false)
    if (checked === true) {
        return (
            <>
                <div className={'devs'}>
                    <label> Dev tools</label >
                    <Switch onChange={() => { setChecked(!checked) }} checked={checked} />
                </div >
                <button onClick={() => { reset() }}>Reset users</button>
                <button onClick={() => { massiveUnfollow() }}>Unfollow All</button>
                <button onClick={() => { massiveFollow() }}>Follow All</button>
            </>
        )
    }
    else {
        return (

            <div className={'devs'}>
                <label> Dev tools</label >
                <Switch onChange={() => { setChecked(!checked) }} checked={checked} />
            </div >
        )
    }
}
