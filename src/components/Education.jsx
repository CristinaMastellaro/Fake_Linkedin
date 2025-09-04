import { useState, useEffect } from 'react';
import { Card, Row, Col, Modal, Form, Button } from "react-bootstrap";
import { BiPencil, BiPlus, BiTrash } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Education = () => {
  const { id } = useParams();
  const { myProfile, otherProfile } = useSelector(
    (state) => state.saveProfileMe
  );
  const profileData = id ? otherProfile : myProfile;

  const [showModal, setShowModal] = useState(false);
  const [education, setEducation] = useState([]);
  const [newEducation, setNewEducation] = useState({
    institution: '',
    degree: '',
    startDate: '',
    endDate: '',
    logo: '',
  });
  const [editingEducation, setEditingEducation] = useState(null);

  useEffect(() => {
    const savedEducation = localStorage.getItem('educationData');
    if (savedEducation) {
      setEducation(JSON.parse(savedEducation));
    } else {
      const initialEducation = profileData ? [{
        id: 1,
        institution: profileData.area ? `Università degli Studi di ${profileData.area.split(",")[0]}` : "Università degli Studi di Padova",
        degree: profileData.title ? `Laurea in ${profileData.title.split(" ")[0]}` : "1° ciclo - Laurea L, Lettere/Studi umanistici",
        period: profileData.createdAt ? `${new Date(profileData.createdAt).getFullYear() - 3} - ${new Date(profileData.createdAt).getFullYear()}` : "ott 2020 - dic 2023",
        logo: "https://seeklogo.com/images/U/universita-degli-studi-di-padova-logo-D71B2107E1-seeklogo.com.png",
      }] : [];
      setEducation(initialEducation);
    }
  }, [profileData]);

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setEditingEducation(null);
    setNewEducation({ institution: '', degree: '', startDate: '', endDate: '', logo: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEducation(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewEducation(prevState => ({
          ...prevState,
          logo: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = (edu) => {
    setEditingEducation(edu);
    setNewEducation({
      institution: edu.institution,
      degree: edu.degree,
      startDate: '',
      endDate: '',
      logo: edu.logo,
    });
    handleShow();
  };

  const handleDelete = (id) => {
    const updatedEducation = education.filter(edu => edu.id !== id);
    setEducation(updatedEducation);
    localStorage.setItem('educationData', JSON.stringify(updatedEducation));
    handleClose();
  };

  const handleSave = () => {
    const period = `${newEducation.startDate ? new Date(newEducation.startDate).getFullYear() : 'Data non specificata'} - ${newEducation.endDate ? new Date(newEducation.endDate).getFullYear() : 'Presente'}`;

    if (editingEducation) {
      const updatedEducation = education.map(edu =>
        edu.id === editingEducation.id
          ? {
              ...edu,
              institution: newEducation.institution,
              degree: newEducation.degree,
              period: period,
              logo: newEducation.logo || edu.logo,
            }
          : edu
      );
      setEducation(updatedEducation);
      localStorage.setItem('educationData', JSON.stringify(updatedEducation));
    } else {
      const id = education.length > 0 ? Math.max(...education.map(e => e.id)) + 1 : 1;
      const newEntry = {
        id,
        institution: newEducation.institution,
        degree: newEducation.degree,
        period: period,
        logo: newEducation.logo || "https://seeklogo.com/images/U/universita-degli-studi-di-padova-logo-D71B2107E1-seeklogo.com.png",
      };
      const updatedEducation = [...education, newEntry];
      setEducation(updatedEducation);
      localStorage.setItem('educationData', JSON.stringify(updatedEducation));
    }
    handleClose();
  };

  return (
    <Card className="border border-1 rounded-4 m-4 position-relative shadow">
      <Card.Body className="border-bottom container">
        <Row>
          <Col xs={10}>
            <Card.Title>Formazione</Card.Title>
          </Col>
          {!id && (
            <Col xs={2} className="d-flex gap-2 justify-content-end">
              <BiPlus className="fs-3 edit" onClick={handleShow} style={{ cursor: 'pointer' }} />
            </Col>
          )}
        </Row>
        <hr />

        {education.length > 0 ? (
          education.map((edu) => (
            <div key={edu.id} className="d-flex mt-3 position-relative">
              <div>
                <img src={edu.logo} alt="Logo università" className="job-logo rounded-circle mt-1" />
              </div>
              <div className="d-flex flex-column ms-2 w-100">
                <div className="mb-2">
                  <p className="mb-0 fw-semibold">{edu.institution}</p>
                  <p className="mb-0">{edu.degree}</p>
                  <p className="mb-0 opacity-50">{edu.period}</p>
                </div>
              </div>
              {!id && (
                <div className="d-flex gap-2">
                  <BiPencil className="fs-5 edit" onClick={() => handleEdit(edu)} style={{ cursor: 'pointer' }} />
                  <BiTrash className="fs-5 edit" onClick={() => handleDelete(edu.id)} style={{ cursor: 'pointer' }} />
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="mt-3 text-muted">
            <p className="mb-0">Nessuna informazione educativa disponibile</p>
          </div>
        )}
      </Card.Body>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editingEducation ? 'Modifica Titolo di studio' : 'Aggiungi Titolo di studio'}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Scuola o università*</Form.Label>
              <Form.Control type="text" name="institution" value={newEducation.institution} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Titolo di studio*</Form.Label>
              <Form.Control type="text" name="degree" value={newEducation.degree} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Data di inizio</Form.Label>
              <Form.Control type="date" name="startDate" value={newEducation.startDate} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Data di fine</Form.Label>
              <Form.Control type="date" name="endDate" value={newEducation.endDate} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="imageFile" className="mb-3">
              <Form.Label>Immagine</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-between">
          <div>
            {editingEducation && (
              <Button variant="danger" onClick={() => handleDelete(editingEducation.id)}>Elimina</Button>
            )}
          </div>
          <div>
            <Button variant="secondary" onClick={handleClose}>Annulla</Button>
            <Button variant="primary" onClick={handleSave}>Salva</Button>
          </div>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default Education;