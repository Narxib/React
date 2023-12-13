import { useState, useId } from "react"
import { useFilters } from "../hooks/useFilters"

export function Filters() {
    const { filters, setFilters } = useFilters()
    const [minPrice, setMinPrice] = useState(0)
    const minPriceFilterId = useId()
    const categoryFilterId = useId()

    const handleChangePrice = (event) => {
        setMinPrice(event.target.value)
        setFilters(prev => ({
            ...prev, minPrice: event.target.value
        }))
    }

    const handleChangeCategory = (event) => {
        setFilters(prev => ({
            ...prev, category: event.target.value
        }))
    }

    return (
        <section>
            <div>
                <label htmlFor={minPriceFilterId}>Price</label>
                <input type="range" id={minPriceFilterId} min="0" max="1000" onChange={handleChangePrice} value={filters.minPrice} />
                <span>${filters.minPrice}</span>
            </div>
            <div>
                <label htmlFor={categoryFilterId}>Categoria</label>
                <select id={categoryFilterId} onChange={handleChangeCategory}>
                    <option value="all">Todas</option>
                    <option value="smartphones">Smartphones</option>
                    <option value="laptops">Portatiles</option>
                </select>
            </div>
        </section>
    )
}