import { useState } from "react"

export function Filters({ onChange }) {
    const [minPrice, setMinPrice] = useState(0)

    const handleChangePrice = (event) => {
        setMinPrice(event.target.value)
        onChange(prev => ({
            ...prev, minPrice: event.target.value
        }))
    }

    const handleChangeCategory = (event) => {
        onChange(prev => ({
            ...prev, category: event.target.value
        }))
    }

    return (
        <section>
            <div>
                <label htmlFor="price">Price</label>
                <input type="range" id="price" min="0" max="1000" onChange={handleChangePrice} />
                <span>${minPrice}</span>
            </div>
            <div>
                <label htmlFor="category">Categoria</label>
                <select id="category" onChange={handleChangeCategory}>
                    <option value="all">Todas</option>
                    <option value="smartphones">Smartphones</option>
                    <option value="laptops">Portatiles</option>
                </select>
            </div>
        </section>
    )
}