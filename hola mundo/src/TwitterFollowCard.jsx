import "./TwitterFollowCard.css"

export function TwitterFollowCard({children,userName=`unknown`,isFollowing}){
  return (
    <article className="tw-follow-card">
      <header className="tw-follow-card-header">
        <img className="tw-follow-card-img" src={`https://unavatar.io/${userName}`} alt="avatar"/>
        <div className="tw-follow-card-div">
          <strong>{children}</strong>
          <span className="tw-follow-card-span">@{userName}</span>
        </div>
      </header>
      <aside>
        <button className="tw-follow-card-button">Seguir</button>
      </aside>
    </article>
  )
}