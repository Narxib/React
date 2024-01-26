import { useQuestionsData } from "./hooks/useQuestionsData"
import { useQuestionsStore } from "./store/questions"

export const Results = () => {
    const { reset } = useQuestionsStore()

    function handleReset() {
        reset()
    }
    const { correct, incorrect } = useQuestionsData()
    return (
        <>
            <h4>Has acertado 💹 {correct} y has fallado ❌ {incorrect}</h4><button onClick={handleReset}>Reset</button>
        </>
    )

}