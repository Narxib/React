import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { ArrowsIcon } from './components/icons'
import { Container, Row, Col, Button, Stack } from 'react-bootstrap'
import { useStore } from './hooks/useStore'
import { AUTO_LANGUAGE } from './constants'

function App () {
  const { fromLanguage, toLanguage, setFromLanguage, interchangeLanguages } = useStore()
  return (
    <Container fluid>
      <h1>Goole Translate</h1>
      <Row>
        <Col><h2>From</h2>
          {fromLanguage}
        </Col>
        <Col><button style={{ backgroundColor: 'grey' }} variant="link" disabled={fromLanguage === AUTO_LANGUAGE} onClick={interchangeLanguages}><ArrowsIcon /></button></Col>
        <Col><h2>To</h2>
          {toLanguage}
        </Col>
      </Row>
    </Container>
  )
}

export default App
