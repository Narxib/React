import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { ArrowsIcon } from './components/icons'
import { Container, Row, Col, Button, Stack, Form } from 'react-bootstrap'
import { useStore } from './hooks/useStore'
import { AUTO_LANGUAGE } from './constants'
import { LanguageSelector } from './components/LanguageSelector'
import { TextArea } from './components/TextArea'
import { SectionType } from './types'

function App () {
  const { fromLanguage, toLanguage, setFromText, setResult, setFromLanguage, fromText, setToLanguage, interchangeLanguages, result } = useStore()
  return (
    <Container fluid>
      <h1>Goole Translate</h1>
      <Row>
        <Col><h2>From</h2>
          <Stack gap={2}>
          <LanguageSelector onChange={setFromLanguage}
          type="from"
          onChange={setFromText}
          value={fromLanguage}
           />
          <TextArea type={SectionType.From} placeholder='Introduce texto' value={fromText}> </TextArea>
          </Stack>
        </Col>
        <Col><button style={{ backgroundColor: 'white' }} disabled={fromLanguage === AUTO_LANGUAGE} onClick={interchangeLanguages}><ArrowsIcon /></button></Col>
        <Col><h2>To</h2>
          <Stack gap={2}>
          <LanguageSelector type="to" value={toLanguage} onChange={setToLanguage} />
          <TextArea onChange={setResult} type={SectionType.To} placeholder='Traduccion' value={result} ></TextArea>
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default App
