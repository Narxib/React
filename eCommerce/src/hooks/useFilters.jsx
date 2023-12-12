import { useContext } from "react"
import { FiltersContext } from "../context/filters"

export function useFilters() {
    const { filters, setFilters } = useContext(FiltersContext)

    const filterProducts = (products) => {
        return products.filter(item => {
            return (
                item.price > filters.minPrice && (
                    filters.category === "all" || item.category === filters.category
                )
            )
        })
    }
    return { filters, filterProducts, setFilters }
}