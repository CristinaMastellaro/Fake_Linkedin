import { useState, useEffect, useRef } from 'react'
import { Card, Row, Col, Modal, Form, Button } from 'react-bootstrap'
import { BiPencil } from 'react-icons/bi'
import { useSelector, useDispatch } from 'react-redux'
import { updateProfile } from '../redux/actions'

const Info = () => {
  const [showModal, setShowModal] = useState(false)
  const myInfo = useSelector((state) => state.saveProfileMe.myProfile)
  const dispatch = useDispatch()

  const [editedBio, setEditedBio] = useState(myInfo?.bio || '')
  const textareaRef = useRef(null)

  useEffect(() => {
    if (myInfo) {
      setEditedBio(myInfo.bio)
    }
  }, [myInfo])

  const handleShow = () => {
    setShowModal(true)
  }

  const handleClose = () => {
    setShowModal(false)
    setEditedBio(myInfo?.bio || '')
  }

  const handleSave = async () => {
    await dispatch(updateProfile({ bio: editedBio }))
    handleClose()
  }

  return (
    <>
      <Card className="border border-1 rounded-4 m-4 position-relative">
        <Card.Body className="border-bottom container">
          <Row>
            <Col xs={11}>
              <Card.Title>Informazioni</Card.Title>
              <Card.Text className="mt-4">
                {myInfo?.bio || 'Nessuna biografia'}
              </Card.Text>
            </Col>
            <Col xs={1}>
              <BiPencil className="fs-4 edit" onClick={handleShow} />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica Informazioni</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="bioTextarea">
              <Form.Label>Biografia</Form.Label>
              <Form.Control
                as="textarea"
                ref={textareaRef}
                rows={5}
                value={editedBio}
                onChange={(e) => setEditedBio(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Annulla
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Salva
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Info
