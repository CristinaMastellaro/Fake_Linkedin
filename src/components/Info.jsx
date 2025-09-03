<<<<<<< HEAD
import { useState, useEffect, useRef } from "react";
import { Card, Row, Col, Modal, Form, Button } from "react-bootstrap";
import { BiPencil } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";

const Info = () => {
  const [showModal, setShowModal] = useState(false);
  
  const myInfo = useSelector((state) => state.saveProfileMe.myProfile);
  const dispatch = useDispatch();

  const [editedBio, setEditedBio] = useState(myInfo?.bio || "");
  const textareaRef = useRef(null);

  useEffect(() => {
    if (myInfo) {
      setEditedBio(myInfo.bio);
    }
  }, [myInfo]);

  const handleShow = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setEditedBio(myInfo?.bio || "");
  };

  const handleSave = async () => {
    const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGI1NTJlZGQyOWE0OTAwMTUxZjIwODYiLCJpYXQiOjE3NTY3MTM3MDksImV4cCI6MTc1NzkyMzMwOX0.2QqwabOIJ4yHBhR_8VkIe6oenP3ri7nHieLQL9H5Tmw";

    try {
      const response = await fetch("https://striveschool-api.herokuapp.com/api/profile/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({ bio: editedBio }),
      });

      if (response.ok) {
        const updatedProfile = await response.json();
        console.log("Profilo aggiornato con successo:", updatedProfile);

        dispatch({ type: "UPDATE_PROFILE", payload: updatedProfile });

        handleClose();
      } else {
        console.error("Salvataggio fallito:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Errore di rete:", error);
    }
  };
=======
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
>>>>>>> main

  return (
    <>
      <Card className="border border-1 rounded-4 m-4 position-relative">
        <Card.Body className="border-bottom container">
          <Row>
            <Col xs={11}>
              <Card.Title>Informazioni</Card.Title>
<<<<<<< HEAD
              <Card.Text className="mt-4">{myInfo?.bio || "Nessuna biografia"}</Card.Text>
=======
              <Card.Text className="mt-4">
                {myInfo?.bio || 'Nessuna biografia'}
              </Card.Text>
>>>>>>> main
            </Col>
            <Col xs={1}>
              <BiPencil className="fs-4 edit" onClick={handleShow} />
            </Col>
          </Row>
        </Card.Body>
      </Card>
<<<<<<< HEAD

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
  );
};

export default Info;
=======

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
>>>>>>> main
