import { useEffect, useState } from "react";
import { Form, Alert, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  createExperience,
  updateExperience,
  uploadExperienceImage,
} from "../redux/actions";

const ExperienceForm = ({ handleCloseModal, userId, experience }) => {
  const { experiencesLoading } = useSelector((state) => state.saveProfileMe);

  const dispatch = useDispatch();
  const [editingExperience, setEditingExperience] = useState(null);

  useEffect(() => {
    console.log("experience", experience);
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
  }, []);

  const [formData, setFormData] = useState({
    role: "",
    company: "",
    startDate: "",
    endDate: "",
    description: "",
    area: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [alert, setAlert] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      setAlert({ type: "danger", message: "User ID not found." });
      return;
    }
    try {
      if (editingExperience) {
        await dispatch(
          updateExperience(userId, editingExperience._id, formData)
        );
        if (imageFile) {
          await dispatch(
            uploadExperienceImage(userId, editingExperience._id, imageFile)
          );
        }
      } else {
        const action = await dispatch(createExperience(userId, formData));
        if (imageFile && action.payload && action.payload._id) {
          await dispatch(
            uploadExperienceImage(userId, action.payload._id, imageFile)
          );
        }
      }
      setAlert({ type: "success", message: "Experience saved successfully." });
      //   dispatch(fetchExperiences(userId));
      handleCloseModal();
    } catch (error) {
      setAlert({
        type: "danger",
        message: error.message || "Failed to save experience.",
      });
    }
  };

  return (
    <>
      {alert && <Alert variant={alert.type}>{alert.message}</Alert>}
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
        {/* <Form.Group controlId="imageFile" className="mb-3">
          <Form.Label>Immagine</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
        </Form.Group> */}
        <Button variant="primary" type="submit" disabled={experiencesLoading}>
          {experiencesLoading ? "Salvataggio..." : "Salva"}
        </Button>
      </Form>
    </>
  );
};

export default ExperienceForm;
