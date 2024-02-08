import { useEffect,useState, Children } from "react"
import { EVENTS } from "./consts"
import { match } from "path-to-regexp"

export function Router({ children ,routes = [], defaultComponent:DefaultComponent=()=><h1>404</h1>}) {
    const [url, setURL] = useState(window.location.pathname)
  
    useEffect(() => {
      const onLocationChange = () => {
        setURL(window.location.pathname)
      }
      window.addEventListener(EVENTS.NAV_EVENT, onLocationChange)
      window.addEventListener("popstate", onLocationChange)
  
      return () => {
        window.removeEventListener(EVENTS.NAV_EVENT, onLocationChange)
        window.removeEventListener(EVENTS.POP_EVENT, onLocationChange)
      }
    }, [])
    
    let routeParams = {}
    const routesFromChildren = Children.map(children,({props,type}) =>{
      const {name} = type
      const isRoute = name === "Route"
      return isRoute? props:null
    })
    console.log(routesFromChildren)
    
    const Page = routes.find(({ path }) => {
        if (path === url)return true
        const matcherUrl = match(path,{decode:decodeURIComponent})
        const matched = matcherUrl(url)

        if(!matched)return false
        routeParams = matched.params
        return true

    })?.Component
    return Page ? <Page routeParams={routeParams}/> : <DefaultComponent />
  }