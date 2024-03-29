import {EVENTS} from "./consts"

export const navigation = (href) => {
  window.history.pushState({}, "", href)
  const navEvent = new Event(EVENTS.NAV_EVENT)
  window.dispatchEvent(navEvent)
}

export const Link = ({target,to,...props}) =>{
    const handleClick = (event)=>{
        const isMainEvent = event.button === 0
        const isModifiedEvent = event.metaKey || event.altKey || event.ctrlKey || event.shiftKey
        const isManageableEvent = target === undefined || target === "_self"

        if(isMainEvent && isManageableEvent && !isModifiedEvent){
            event.preventDefault()
            navigation(to)
        }
    }
    return <a onClick={handleClick} href={to} target={target} {...props}/>
}