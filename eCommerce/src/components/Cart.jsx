import { useId } from "react"
import { AddToCartIcon, RemoveFromCartIcon, ClearCartIcon, CartIcon } from "./Icons.jsx"
import "./Cart.css"
import { useCart } from "../hooks/useCart.jsx"

export function Cart() {
    const cartCheckboxId = useId()
    const { cart, clearCart, removeFromCart, addtoCart } = useCart()

    function CartItem({ thumbnail, price, title, quantity, addtoCart }) {
        return (
            <li>
                <img src={thumbnail} alt="iPhone" />
                <strong>{title}</strong> -${price}
                <footer>
                    <small >Qt: {quantity}</small>
                    <button onClick={addtoCart}>+</button>
                </footer>
            </li>)
    }

    return (
        <>
            <label className="cart-button" htmlFor={cartCheckboxId}>
                <CartIcon />
            </label>
            <input type="checkbox" id={cartCheckboxId} hidden />
            <aside className="cart">
                <ul>
                    {
                        cart.map(item => (
                            <CartItem key={item.id}
                                addtoCart={() => addtoCart(item)}
                                {...item} />
                        ))}
                </ul>
                <button onClick={clearCart}><ClearCartIcon /></button>
            </aside>
        </>
    )
}