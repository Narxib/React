import { Suspense, lazy } from "react"
import Page404 from "./pages/404.jsx"
import { Home } from "./pages/Home.jsx"
import { Router } from "./Router.jsx"
import { About } from "./pages/About.jsx"
import { Route } from "./Route.jsx"
import Search from "./pages/Search.jsx"
const LazyAbout = lazy(() => import("./pages/About.jsx"))

import './App.css'

const routes = [{
  path: "/",
  Component: Home,
},
{
  path: "/about",
  Component: LazyAbout
},
{
  path: "/search/:query",
  Component: Search
}]



function App() {

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Router routes={routes} defaultComponent={Page404}>
          <Route path="/" Component={Home} />
          <Route path="/about" Component={LazyAbout} />
        </Router >
      </Suspense >

    </>
  )
}

export default App
