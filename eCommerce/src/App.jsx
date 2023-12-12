import { Products } from "./Products"
import { Header } from "./components/Header"
import { Footer } from "./Footer"
import { products as initialProducts } from "./mocks/products.json"
import { useState } from "react"
import { useFilters } from "./hooks/useFilters"



function App() {
  const [products] = useState(initialProducts)
  const { filters, filterProducts } = useFilters()
  const filteredProducts = filterProducts(products)

  return (
    <>
      <Header />

      <Products products={filteredProducts} />
      <Footer />
    </>
  )
}

export default App
