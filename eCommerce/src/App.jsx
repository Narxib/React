import { Products } from "./Products"
import { Header } from "./components/Header"
import { Footer } from "./Footer"
import { Cart } from "./components/Cart"
import { products as initialProducts } from "./mocks/products.json"
import { useState } from "react"
import { useFilters } from "./hooks/useFilters"
import { CartProvider } from "./context/cart"



function App() {
  const [products] = useState(initialProducts)
  const { filters, filterProducts } = useFilters()
  const filteredProducts = filterProducts(products)

  return (
    <CartProvider>
      <Header />
      <Cart />
      <Products products={filteredProducts} />
      <Footer />
    </CartProvider>
  )
}

export default App
