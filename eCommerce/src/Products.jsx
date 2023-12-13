import { AddToCartIcon, RemoveFromCartIcon } from "./components/Icons.jsx"
import { useCart } from "./hooks/useCart.jsx"
import "./Products.css"

export function Products({ products }) {
    const { cart, addtoCart, removeFromCart } = useCart()

    const checkProductInCart = product => {
        return cart.some(item => item.id === product.id)
    }
    return (
        <main className="products">
            <ul>
                {products.slice(0, 10).map(item => {
                    const isProductInCart = checkProductInCart(item)
                    return (
                        <li key={item.id}>
                            <img src={item.thumbnail} alt={item.title} />
                            <div>
                                <strong>{item.title}</strong> - ${item.price}
                            </div>
                            <div>
                                <button onClick={() => { isProductInCart ? removeFromCart(item) : addtoCart(item) }} >
                                    {isProductInCart ? <RemoveFromCartIcon /> : <AddToCartIcon />}
                                </button>
                            </div>

                        </li>
                    )
                })}
            </ul>
        </main >
    )
}