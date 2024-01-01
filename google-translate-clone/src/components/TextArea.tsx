import { Form } from 'react-bootstrap'
import { SectionType } from '../types.d'

interface Props {
  type: SectionType
  loading?: boolean
  onChange: (value: string) => void
  value: string
}
const commonStyles = { height: '150px', width: '300px' }

const getPlaceholder = ({ type, loading }: { type: SectionType, loading?: boolean }) => {
  if (type === SectionType.From) return 'Introducir texto'
  if (loading === true) return 'Cargando...'
  return 'Traduccion'
}
export const TextArea = ({ type, loading, value, onChange }: Props) => {
  const styles = type === SectionType.To
    ? { ...commonStyles, backgroundColor: '#f5f5f5' }
    : commonStyles

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value)
  }
  return (
        <Form.Control
          as="textarea"
          placeholder={getPlaceholder({ type, loading })}
          autoFocus={type === SectionType.From}
          value={value}
          style={styles}>
          onChange={handleChange}
        </Form.Control>
  )
}
