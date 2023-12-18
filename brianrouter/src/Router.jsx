import { EVENTS } from "./consts"
import { useState, useEffect } from "react"
import { default404 } from "./pages/404"
import { match } from "path-to-regexp"

export function Router({ children, routes = [], defaultComponent: DefaultComponent }) {


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

    let routeParams = {}

    const routesFromChildren = Children.map(children, ({ props, type }) => {
        const { name } = type
        const isRoute = name === "Route"
        return isRoute ? props : null
    }).filter(Boolean)

    console.log(routesFromChildren)

    const Page = routes.find(({ path }) => {
        if (path === currentPath) return true
        const matchedUrl = match(path, { decode: decodeURIComponent })
        const matched = matchedUrl(currentPath)
        if (!matched) return false

        routeParams = matched.params
        return true
    })?.Component

    return Page
        ? <Page routeParams={routeParams} />
        : <DefaultComponent />
}
