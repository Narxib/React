import "./App.css"
export function App(){
  return (
    <article className="tw-follow-card">
      <header className="tw-follow-card-header">
        <img className="tw-follow-card-img" src="https://unavatar.io/kikobeats?ttl=1h" alt="avatar"/>
        <div className="tw-follow-card-div">
          <strong>User</strong>
          <span className="tw-follow-card-span">@USER</span>
        </div>
      </header>
      <aside>
        <button className="tw-follow-card-button">Seguir</button>
      </aside>
    </article>
  )
}