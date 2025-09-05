import { Card, Row, Col, Button, Modal, Alert, Spinner } from "react-bootstrap";
import { BiPencil, BiPlus, BiTrash } from "react-icons/bi";
import { FaGem } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchExperiences, deleteExperience } from "../redux/actions";
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
  const [alert, setAlert] = useState(null);
  const [singleExperience, setSingleExperience] = useState(null);

  useEffect(() => {
    if (userId) {
      dispatch(fetchExperiences(userId));
    }
  }, [userId, dispatch]);

  const handleShowModal = (experience = null) => {
    setSingleExperience(experience);
    setEditingExperience(experience);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    dispatch(fetchExperiences(userId));
    setShowModal(false);
  };

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
                      {exp.company} {exp.type || ""}
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

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingExperience ? "Modifica Esperienza" : "Aggiungi Esperienza"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ExperienceForm
            handleCloseModal={handleCloseModal}
            userId={userId}
            experience={singleExperience}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Experiences;
