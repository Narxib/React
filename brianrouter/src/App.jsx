import "./App.css"
import { Router } from "./Router"
import { Route } from "./Route"
import { Home } from "./pages/Home"
import { About } from "./pages/About"
import { Search } from "./pages/Search"
import { default404 } from "./pages/404"

const routes = [{
  path: "/search/:query",
  Component: Search
}
]


function App() {

  return (
    <main>
      <Router routes={routes} defaultComponent={default404} >
        <Route path="/" Component={Home} />
        <Route path="/about" Component={About} />
      </Router>
    </main>
  )
}

export default App
