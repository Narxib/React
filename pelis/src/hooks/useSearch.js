import { useState, useEffect, useRef } from "react"

export function useSearch() {
    const [error, setError] = useState(null)
    const [search, updateSearch] = useState("")
    const isFirstInput = useRef(true)

    useEffect(() => {
        if (isFirstInput.current) {
            isFirstInput.current = search === ""
            return
        }

        if (search === "") {
            setError("Cant search an empty field")
            return
        }
        if (search.match(/^\d+$/)) {
            setError("La busqueda no pueden ser solo numeros")
            return
        }
        if (search.length < 3) {
            setError("Search must be at least 2 characters long")
            return
        }

        setError(null)
    }, [search])

    return { search, updateSearch, error }
}
