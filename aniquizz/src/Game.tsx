import { useQuestionsStore } from "./store/questions"
import { type Question as QuestionType } from "./store/types"
import { Card, Typography, Stack, List, ListItem, ListItemButton, ListItemText, IconButton } from "@mui/material"
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material"
import { FinishGame } from './FinishGame';
import { Results } from "./Results";


const Question = ({ info }: { info: QuestionType }) => {
    const selectAnswer = useQuestionsStore(state => state.selectAnswer)
    const currentQuestion = useQuestionsStore(state => state.currentQuestion)



    const createHandleClick = (answerIndex: number) => () => {
        selectAnswer(info.id, answerIndex, currentQuestion)

    }

    const getBackgroundColor = (info: QuestionType, index: number) => {


        const { userSelectedAnswer, correctAnswer } = info
        // usuario no ha seleccionado nada todavía
        if (userSelectedAnswer == null) return 'transparent'
        // si ya selecciono pero la solución es incorrecta
        if (index !== correctAnswer && index !== userSelectedAnswer) return 'transparent'
        // si esta es la solución correcta
        if (index === correctAnswer) return 'green'

        // si esta es la selección del usuario pero no es correcta
        if (index === userSelectedAnswer) return 'red'
        // si no es ninguna de las anteriores
        return 'transparent'
    }

    return (
        <Card variant='outlined' sx={{ bgcolor: '#222', p: 2, textAlign: 'left', marginTop: 4, maxWidth: '100%' }}>

            <Typography variant='h5'>
                {info.question}
            </Typography>

            <List sx={{ bgcolor: '#333' }} disablePadding>
                {info.answers.map((answer, index) => (
                    <ListItem key={index} disablePadding divider>
                        <ListItemButton
                            disabled={info.userSelectedAnswer != null}
                            onClick={createHandleClick(index)}
                            sx={{
                                bgcolor: getBackgroundColor(info, index)
                            }}
                        >
                            <ListItemText primary={answer} sx={{ textAlign: 'center' }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

        </Card>
    )
}

export const Game = () => {
    const questions = useQuestionsStore(state => state.questions)
    const currentQuestion = useQuestionsStore(state => state.currentQuestion)
    const goNextQuestion = useQuestionsStore(state => state.goNextQuestion)
    const goPreviusQuestion = useQuestionsStore(state => state.goPreviusQuestion)
    const reset = useQuestionsStore(state => state.reset)

    const questionInfo = questions[currentQuestion]
    console.log(questions[currentQuestion].hasbeenAnswered)
    function handleReset() {
        reset()
    }
    return (
        <>
            <Stack direction="row" gap={2} alignItems="center" justifyContent="center">

                <IconButton onClick={goPreviusQuestion} disabled={currentQuestion === 0}>
                    <ArrowBackIosNew />
                </IconButton>
                {currentQuestion + 1}/{questions.length}
                <IconButton onClick={goNextQuestion} disabled={currentQuestion >= questions.length - 1 || questions[currentQuestion].hasbeenAnswered === false}>
                    <ArrowForwardIos />
                </IconButton>

            </Stack >
            <Question info={questionInfo} />
            <button onClick={handleReset}>Reset</button>
            {questions[currentQuestion].hasbeenAnswered && currentQuestion + 1 === questions.length ? <FinishGame /> : <Results />}
        </>
    )
}
