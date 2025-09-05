import {
  Card,
  Row,
  Col,
  Button,
  Modal,
  Form,
  Alert,
  Spinner,
} from "react-bootstrap";
import { BiPencil, BiPlus, BiTrash, BiCamera } from "react-icons/bi";
import { FaGem } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  fetchExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
  uploadExperienceImage,
} from "../redux/actions";
import "../css/services.css";
import ExperienceForm from "./ExperienceForm";

const Experiences = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    myProfile,
    otherProfile,
    experiences,
    experiencesLoading,
    experiencesError,
  } = useSelector((state) => state.saveProfileMe);

  const profileData = id ? otherProfile : myProfile;
  const userId = profileData?._id;

  const [showModal, setShowModal] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);
  // const [formData, setFormData] = useState({
  //   role: "",
  //   company: "",
  //   startDate: "",
  //   endDate: "",
  //   description: "",
  //   area: "",
  // });
  // const [imageFile, setImageFile] = useState(null);
  // const [alert, setAlert] = useState(null);

  useEffect(() => {
    if (userId) {
      dispatch(fetchExperiences(userId));
    }
  }, [userId, dispatch]);

  const handleShowModal = (experience = null) => {
    if (experience) {
      setEditingExperience(experience);
      setFormData({
        role: experience.role || "",
        company: experience.company || "",
        startDate: experience.startDate
          ? experience.startDate.slice(0, 10)
          : "",
        endDate: experience.endDate ? experience.endDate.slice(0, 10) : "",
        description: experience.description || "",
        area: experience.area || "",
      });
    } else {
      setEditingExperience(null);
      setFormData({
        role: "",
        company: "",
        startDate: "",
        endDate: "",
        description: "",
        area: "",
      });
    }
    setImageFile(null);
    setAlert(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingExperience(null);
    setFormData({
      role: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
      area: "",
    });
    setImageFile(null);
    setAlert(null);
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };

  // const handleFileChange = (e) => {
  //   setImageFile(e.target.files[0]);
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!userId) {
  //     setAlert({ type: "danger", message: "User ID not found." });
  //     return;
  //   }
  //   try {
  //     if (editingExperience) {
  //       await dispatch(
  //         updateExperience(userId, editingExperience._id, formData)
  //       );
  //       if (imageFile) {
  //         await dispatch(
  //           uploadExperienceImage(userId, editingExperience._id, imageFile)
  //         );
  //       }
  //     } else {
  //       const action = await dispatch(createExperience(userId, formData));
  //       if (imageFile && action.payload && action.payload._id) {
  //         await dispatch(
  //           uploadExperienceImage(userId, action.payload._id, imageFile)
  //         );
  //       }
  //     }
  //     setAlert({ type: "success", message: "Experience saved successfully." });
  //     dispatch(fetchExperiences(userId));
  //     handleCloseModal();
  //   } catch (error) {
  //     setAlert({
  //       type: "danger",
  //       message: error.message || "Failed to save experience.",
  //     });
  //   }
  // };

  const handleDelete = async (expId) => {
    if (!userId) return;
    if (!window.confirm("Sei sicuro di voler eliminare questa esperienza?"))
      return;
    try {
      await dispatch(deleteExperience(userId, expId));
      dispatch(fetchExperiences(userId));
    } catch (error) {
      setAlert({
        type: "danger",
        message: error.message || "Failed to delete experience.",
      });
    }
  };

  return (
    <>
      <Card className="border border-1 rounded-4 m-4 position-relative shadow">
        <Card.Body className="border-bottom container">
          <Row>
            <Col xs={10}>
              <Card.Title>Esperienza</Card.Title>
            </Col>
            {!id && (
              <Col xs={2} className="d-flex gap-2 justify-content-end">
                <Button variant="light" onClick={() => handleShowModal()}>
                  <BiPlus className="fs-3" />
                </Button>
              </Col>
            )}
          </Row>
          {experiencesLoading && (
            <div className="d-flex justify-content-center my-3">
              <Spinner animation="border" />
            </div>
          )}
          {experiencesError && (
            <Alert variant="danger" className="mt-3">
              {experiencesError}
            </Alert>
          )}
          {!experiencesLoading && experiences.length === 0 && (
            <div className="mt-3 text-muted">
              <p className="mb-0">Nessuna esperienza lavorativa disponibile</p>
            </div>
          )}
          {!experiencesLoading &&
            experiences.map((exp) => (
              <div key={exp._id} className="d-flex mt-3">
                <div>
                  <img
                    src={
                      exp.image ||
                      "https://content.wepik.com/statics/27196968/preview-page0.jpg"
                    }
                    alt="Logo lavoro"
                    className="job-logo rounded-circle mt-1"
                  />
                </div>
                <div className="d-flex flex-column ms-2">
                  <div className="mb-2">
                    <p className="mb-0 fw-semibold">{exp.role}</p>
                    <p className="mb-0">
                      {exp.company} · {exp.type || ""}
                    </p>
                    <p className="mb-0 opacity-50">
                      {exp.startDate?.slice(0, 10)} -{" "}
                      {exp.endDate ? exp.endDate.slice(0, 10) : "Presente"}
                    </p>
                    <p className="mb-0 opacity-50">{exp.area}</p>
                  </div>
                  <p className="mb-0 fw-bold">
                    <FaGem /> {exp.description}
                  </p>
                </div>
                {!id && (
                  <div className="ms-auto d-flex gap-2 align-items-center">
                    <Button
                      variant="light"
                      onClick={() => handleShowModal(exp)}
                    >
                      <BiPencil />
                    </Button>
                    <Button
                      variant="light"
                      onClick={() => handleDelete(exp._id)}
                    >
                      <BiTrash />
                    </Button>
                  </div>
                )}
              </div>
            ))}
        </Card.Body>
      </Card>

      <ExperienceForm />

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingExperience ? "Modifica Esperienza" : "Aggiungi Esperienza"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* {alert && <Alert variant={alert.type}>{alert.message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="role">
              <Form.Label>Ruolo</Form.Label>
              <Form.Control
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="company">
              <Form.Label>Azienda</Form.Label>
              <Form.Control
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="startDate">
              <Form.Label>Data Inizio</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="endDate">
              <Form.Label>Data Fine</Form.Label>
              <Form.Control
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="area">
              <Form.Label>Area</Form.Label>
              <Form.Control
                type="text"
                name="area"
                value={formData.area}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Descrizione</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="imageFile" className="mb-3">
              <Form.Label>Immagine</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              disabled={experiencesLoading}
            >
              {experiencesLoading ? "Salvataggio..." : "Salva"}
            </Button>
          </Form> */}
          <ExperienceForm handleCloseModal={handleCloseModal} userId={userId} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Experiences;
