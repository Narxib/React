import { Form } from 'react-bootstrap'
import { SectionType } from '../types'

interface Props {
  type: SectionType
  placeholder: string
  loading?: boolean
  onChange: (value: string) => void
  value: string
}

export const TextArea = ({ type, placeholder, loading, value, onChange }: Props) => {
  const commonStyles = { height: '150px', width: '300px' }
  return (
        <Form.Control
        as="textarea"
        placeholder={placeholder}
        autoFocus={type === SectionType.From}
        style={commonStyles}>
        </Form.Control>
  )
}
