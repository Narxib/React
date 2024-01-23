import { useQuestionsData } from "./Hooks/useQuestionsData"
import { useQuestionsStore } from "./store/questions"

export const Footer = () => {
    const { correct, incorrect, unanswered } = useQuestionsData()
    const reset = useQuestionsStore(state => state.reset)

    return (
        <footer style={{ marginTop: "16px" }}>
            <strong>{`💹${correct} correctas - ❌${incorrect} incorrectas - ❓${unanswered} sin responder`}</strong>
            <button onClick={() => reset()}>Reset</button>
        </footer>
    )
}