import "./App.css"
import { Router } from "./Router"
import { Home } from "./pages/Home"
import { About } from "./pages/About"
import { default404 } from "./pages/404"

const routes = [{
  path: "/",
  Component: Home
},
{
  path: "/about",
  Component: About
}]


function App() {

  return (
    <main>
      <Router routes={routes} defaultComponent={default404} />
    </main>
  )
}

export default App
