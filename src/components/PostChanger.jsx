import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createPost, fetchPosts, modifyPostAction } from "../redux/actions";

const PostChanger = ({
  setAlert,
  handleCloseModal,
  setCurrentPage,
  doModify,
  postInfo,
}) => {
  console.log("postInfo", postInfo);
  const { postsLoading } = useSelector((state) => state.saveProfileMe);
  const initialText = doModify ? postInfo.text : "";
  const [formData, setFormData] = useState({
    text: initialText,
  });
  const [imageFile, setImageFile] = useState(null);
  const [doChangeImage, setDoChangeImage] = useState(false);
  const [keepAlert, setDeleteAlert] = useState(doModify);

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
      console.log("imageFile", typeof imageFile);
      // console.log("action", action);
      //   if (imageFile && action.payload && action.payload._id) {
      //     console.log("sono dentro l'if");
      //     await dispatch(uploadPostImage(action.payload._id, imageFile));
      //   }
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

  const handleSubmitModify = (e) => {
    e.preventDefault();
    console.log("formData.text", formData);
    dispatch(modifyPostAction(postInfo._id, formData, imageFile));
  };

  return (
    <Form onSubmit={doModify ? handleSubmitModify : handleSubmitCreate}>
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
      {keepAlert ? (
        <>
          <Alert>
            Vuoi modificare anche l'immagine? Se sì, l'immagine precedente verrà
            persa.
          </Alert>
          <div className="d-flex justify-content-end gap-2">
            <Button
              variant="danger"
              onClick={() => {
                setDoChangeImage(true);
                setDeleteAlert(false);
              }}
            >
              Sì
            </Button>
            <Button
              variant="success"
              onClick={() => {
                setDeleteAlert(false);
              }}
            >
              No
            </Button>
          </div>
        </>
      ) : (
        ""
      )}
      {doModify ? (
        ""
      ) : (
        <Form.Group controlId="imageFile" className="mb-3">
          <Form.Label>Immagine (opzionale)</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
        </Form.Group>
      )}
      {doChangeImage ? (
        <Form.Group controlId="imageFile" className="mb-3">
          <Form.Label>Immagine (opzionale)</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
        </Form.Group>
      ) : (
        ""
      )}
      {/* {doChangeImage ? (
        <Form.Group controlId="imageFile" className="mb-3">
          <Form.Label>Immagine (opzionale)</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
        </Form.Group>
      ) : (
        ""
      )} */}
      <Button variant="primary" type="submit" disabled={postsLoading}>
        {postsLoading ? "Pubblicando..." : "Pubblica"}
      </Button>
    </Form>
  );
};

export default PostChanger;
