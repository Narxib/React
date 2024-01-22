import { Card, Typography, Stack, List, ListItem, ListItemButton, ListItemText } from "@mui/material"
import { useQuestionsStore } from "./store/questions"
import { type Question as QuestionType } from "./store/types"
import SyntaxHighlighter from "react-syntax-highlighter"
import { gradientDark } from "react-syntax-highlighter/dist/esm/styles/hljs"

const Question = ({ info }: { info: QuestionType }) => {
    const selectAnswer = useQuestionsStore(state => state.selectAnswer)
    const createHandleClick = (answerIndex: number) => () => {
        selectAnswer(info.id, answerIndex)
    }

    const getBackgroundColor = (info: QuestionType, index: number) => {
        const { correctAnswer, userSelectedAnswer } = info
        if (userSelectedAnswer == null) return "transparent"
        if (index !== correctAnswer && index !== userSelectedAnswer) return "transparent"
        if (index === correctAnswer) return "green"
        if (index === userSelectedAnswer) return "red"
        return "transparent"
    }

    return (
        <Card variant="outlined" sx={{ bgcolor: "#222", p: 2, textAlign: "left" }}>
            <Typography variant="h5">
                {info.question}
            </Typography>
            <SyntaxHighlighter language="javascript" style={gradientDark} >
                {info.code}
            </SyntaxHighlighter>
            <List sx={{ bgcolor: "#333" }} disablePadding>
                {info.answers.map((answer, index) => (
                    <ListItem key={index} disablePadding divider>
                        <ListItemButton disabled={info.userSelectedAnswer != null} sx={{ backgroundColor: getBackgroundColor(info, index) }} onClick={createHandleClick(index)}>
                            <ListItemText primary={answer} sx={{ textAlign: "center", bgColor: "red" }} />
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
    const questionInfo = questions[currentQuestion]

    return (
        <>
            <Question info={questionInfo} />
        </>
    )
}