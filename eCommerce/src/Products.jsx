import { AddToCartIcon } from "./components/Icons.jsx"
import "./Products.css"

export function Products({ products }) {
    return (
        <main className="products">
            <ul>
                {products.slice(0, 10).map(item => (
                    <li key={item.id}>
                        <img src={item.thumbnail} alt={item.title} />
                        <div>
                            <strong>{item.title}</strong> - ${item.price}
                        </div>
                        <div>
                            <button>
                                <AddToCartIcon />
                            </button>
                        </div>

                    </li>
                ))}
            </ul>
        </main>
    )
}