import { useQuestionsStore } from "./store/questions"


export const Start = () => {
    const fetchQuestions = useQuestionsStore(state => state.fetchQuestions)
    const handleClick = () => {
        fetchQuestions()
    }
    return (
        <>
            <h2>Start game</h2>
            <button onClick={handleClick}>
                ¡Empezar!
            </button>
        </>

    )
}