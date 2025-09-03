import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createPost, fetchPosts } from "../redux/actions";

const PostChanger = ({
  setAlert,
  handleCloseModal,
  setCurrentPage,
  doModify,
}) => {
  const { postsLoading } = useSelector((state) => state.saveProfileMe);
  const [formData, setFormData] = useState({
    text: "",
  });
  const [imageFile, setImageFile] = useState(null);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmitCreate = async (e) => {
    e.preventDefault();

    if (!formData.text.trim()) {
      setAlert({
        type: "danger",
        message: "Il testo del post è obbligatorio.",
      });
      return;
    }
    try {
      // console.log("formData", formData);
      await dispatch(createPost(formData, imageFile));
      // console.log("imageFile", imageFile);
      // console.log("action", action);
      // if (imageFile && action.payload && action.payload._id) {
      //   console.log("sono dentro l'if");
      //   await dispatch(uploadPostImage(action.payload._id, imageFile));
      // }
      setAlert({ type: "success", message: "Post creato con successo." });
      dispatch(fetchPosts());
      //  // Torna alla prima pagina dopo la creazione del post
      setCurrentPage(1);
      handleCloseModal();
    } catch (error) {
      setAlert({
        type: "danger",
        message: error.message || "Errore nella creazione del post.",
      });
    }
  };

  const handleSubmitModify = () => {};

  return (
    <Form onSubmit={doModify ? handleSubmitCreate : handleSubmitModify}>
      <Form.Group className="mb-3" controlId="text">
        <Form.Label>Testo del Post</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          name="text"
          value={formData.text}
          onChange={handleChange}
          placeholder="Scrivi qualcosa..."
          required
        />
      </Form.Group>
      <Form.Group controlId="imageFile" className="mb-3">
        <Form.Label>Immagine (opzionale)</Form.Label>
        <Form.Control type="file" onChange={handleFileChange} />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={postsLoading}>
        {postsLoading ? "Pubblicando..." : "Pubblica"}
      </Button>
    </Form>
  );
};

export default PostChanger;
