import { useState, useRef, useEffect } from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import { BiPencil, BiTrash, BiPlus, BiRightArrowAlt } from 'react-icons/bi'

const Services = () => {
  const [services, setServices] = useState([
    'Sviluppo Web',
    'Sviluppo di database',
    'Cloud Computing',
  ])
  const [editingIndex, setEditingIndex] = useState(null)
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        const newServices = [...services]
        newServices[editingIndex] = inputValue
        setServices(newServices)
        setEditingIndex(null)
      }
    }

    if (editingIndex !== null) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [editingIndex, inputValue, services])

  const handleAddService = () => {
    const newServices = [...services, '']
    setServices(newServices)
    setEditingIndex(newServices.length - 1)
    setInputValue('')
  }

  const handleEditClick = (index, value) => {
    setEditingIndex(index)
    setInputValue(value)
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      const newServices = [...services]
      newServices[editingIndex] = inputValue
      setServices(newServices)
      setEditingIndex(null)
    }
  }

  const handleDeleteClick = (index) => {
    const newServices = services.filter((_, i) => i !== index)
    setServices(newServices)
  }

  return (
    <Card className="border border-1 rounded-4 m-4 position-relative shadow">
      <Card.Body className="border-bottom container">
        <Card.Title className="mb-4 d-flex justify-content-between align-items-center">
          Competenze
          <BiPlus
            className="fs-4 add-icon iconehome"
            onClick={handleAddService}
          />
        </Card.Title>
        <div className="fw-semibold">
          {services.map((service, index) => (
            <Row key={index} className="align-items-center my-2">
              <Col xs={10}>
                {editingIndex === index ? (
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleInputKeyDown}
                    className="form-control form-control-sm"
                  />
                ) : (
                  <p className="my-1">{service}</p>
                )}
              </Col>
              <Col
                xs={2}
                className="d-flex justify-content-end align-items-center"
              >
                <BiPencil
                  className="fs-6 edit-icon me-2 iconehome"
                  onClick={() => handleEditClick(index, service)}
                />
                <BiTrash
                  className="fs-6 trash-icon iconehome"
                  onClick={() => handleDeleteClick(index)}
                />
              </Col>
            </Row>
          ))}
        </div>
      </Card.Body>
      <div className="fw-semibold d-flex align-items-center justify-content-center py-1 opacity-75">
        Mostra tutte le attività <BiRightArrowAlt className="ms-1 iconehome" />
      </div>
    </Card>
  )
}

export default Services
