import { EVENTS } from "./consts"
import { useState, useEffect } from "react"
import { default404 } from "./pages/404"

export function Router({ routes = [], defaultComponent: DefaultComponent }) {
    const [currentPath, setCurrentPath] = useState(window.location.pathname)
    useEffect(() => {
        const onLocationChange = () => {
            setCurrentPath(window.location.pathname)
        }
        window.addEventListener(EVENTS.PUSHSTATE, onLocationChange)
        window.addEventListener(EVENTS.POPSTATE, onLocationChange)
        return () => {
            window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange)
            window.removeEventListener(EVENTS.POPSTATE, onLocationChange)
        }
    }, [])
    const Page = routes.find(({ path }) => path === currentPath)?.Component

    return Page ? <Page /> : <DefaultComponent />
}
