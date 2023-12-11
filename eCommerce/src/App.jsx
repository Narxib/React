import { Products } from "./Products"
import { Header } from "./components/Header"
import { products as initialProducts } from "./mocks/products.json"
import { useState } from "react"

function App() {
  const [products] = useState(initialProducts)
  const [filters, setFilters] = useState({
    category: "all",
    minPrice: 0
  })

  const filterProducts = (products) => {
    return products.filter(item => {
      return (
        item.price > filters.minPrice && (
          filters.category === "all" || item.category === filters.category
        )
      )
    })
  }

  const filteredProducts = filterProducts(products)

  return (
    <>
      <Header changeFilters={setFilters} />

      <Products products={filteredProducts} />
    </>
  )
}

export default App
