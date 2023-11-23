import { TwitterFollowCard } from "./TwitterFollowCard";
import "./App.css"

export function App(){
    return(
    <div>
        <TwitterFollowCard isFollowing  userName="Narxib">
            Brian Zaragoza Cerdá
        </TwitterFollowCard>
        <TwitterFollowCard isFollowing  userName="midudev">
            Midudev
        </TwitterFollowCard>
        <TwitterFollowCard isFollowing  >
           Midudev
        </TwitterFollowCard>
    </div>
    )
}