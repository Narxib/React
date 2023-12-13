import { createContext, useReducer, useState } from "react";
import { initialState, cartReducer } from "../reducers/cart";
export const CartContext = createContext()


export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, initialState)

    const addtoCart = product => dispatch({
        type: "ADD_TO_CART",
        payload: product
    })
    const removeFromCart = product => dispatch({
        type: "REMOVE_FROM_CART",
        payload: product
    })

    const clearCart = product => dispatch({
        type: "CLEAR_CART",
        payload: product
    })

    return (
        <CartContext.Provider value={{
            cart: state, addtoCart, clearCart, removeFromCart
        }}>
            {children}
        </CartContext.Provider>
    )
}