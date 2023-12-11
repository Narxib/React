import { Filters } from "./Filters.jsx"
export function Header({ changeFilters }) {
    return (
        <header>
            <h2>React Shop</h2>
            <Filters onChange={changeFilters} />
        </header>
    )
}