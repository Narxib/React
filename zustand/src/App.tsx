import './App.css';
import { JavascriptLogo } from './JavascriptLogo';
import { Container, Typography, Stack } from '@mui/material';
import { Start } from './Start';
import { Game } from './Game';

import { useQuestionsStore } from './store/questions';
import { Footer } from './Footer';

function App() {
  const questions = useQuestionsStore(state => state.questions)
  console.log(questions)
  return (
    <main>
      <Container maxWidth="sm">
        <Stack direction={"row"} alignItems={"center"} gap={2} justifyContent={"center"}>
          <JavascriptLogo />
          <Typography variant='h2' component={"h1"}>
          </Typography>
          <h2>Javascript Quizz</h2>
        </Stack>
      </Container>
      {questions.length === 0 && <Start />}
      {questions.length > 0 && <Game />}
    </main >
  )
}

export default App
