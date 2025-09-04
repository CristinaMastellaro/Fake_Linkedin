import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  createPost,
  fetchPosts,
  modifyPostAction,
  uploadPostImage,
} from "../redux/actions";
import "../css/postChanger.css";
import {
  BiImageAdd,
  BiSmile,
  BiCalendar,
  BiPlus,
  BiImage,
} from "react-icons/bi";
import changeImagePicture from "../assets/CreateImage.png";

const PostChanger = ({
  setAlert,
  handleCloseModal,
  setCurrentPage,
  doModify,
  postInfo,
  changeOnlyImage,
}) => {
  // console.log("postInfo", postInfo);
  const { postsLoading } = useSelector((state) => state.saveProfileMe);
  const initialText = doModify ? postInfo.text : "";
  const [formData, setFormData] = useState({
    text: initialText,
  });
  const [imageFile, setImageFile] = useState(null);
  const [doChangeImage, setDoChangeImage] = useState(false);
  const [keepAlert, setDeleteAlert] = useState(doModify);

  const dispatch = useDispatch();

  const [isImageAdded, setIsImageAdded] = useState(false);
  const [deleteImage, setDeleteImage] = useState(false);
  const [messageDeleteImage, setMessageDeleteImage] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
    console.log("e.target.files[0]", e.target.files[0]);
    setIsImageAdded(true);
  };

  const handleSubmitCreate = async (e) => {
    e.preventDefault();

    if (!formData.text.trim() && !changeOnlyImage) {
      setAlert({
        type: "danger",
        message: "Il testo del post è obbligatorio.",
      });
      return;
    }
    try {
      if (changeOnlyImage) {
        await dispatch(createPost({ text: "T" }, imageFile));
      } else {
        await dispatch(createPost(formData, imageFile));
      }

      setAlert({ type: "success", message: "Post creato con successo." });
      dispatch(fetchPosts());
      // Torna alla prima pagina dopo la creazione del post
      setCurrentPage(1);
      handleCloseModal();
    } catch (error) {
      setAlert({
        type: "danger",
        message: error.message || "Errore nella creazione del post.",
      });
    }
  };

  const handleSubmitModify = async (e) => {
    e.preventDefault();
    console.log("formData.text", formData);
    if (changeOnlyImage) {
      await dispatch(modifyPostAction(postInfo._id, formData, imageFile));
    } else {
      await dispatch(modifyPostAction(postInfo._id, formData, imageFile));
    }
    handleCloseModal();
  };

  const imageChanger = (
    <>
      <BiSmile className="icons-form mt-0 ms-3" />
      <div className="mb-2 d-flex">
        <div>
          <label for="file-upload" className="custom-file-upload">
            <BiImageAdd className="icons-form" />
          </label>
          <input
            id="file-upload"
            type="file"
            // className="fs-3"
            onChange={handleFileChange}
          />
        </div>
        <BiCalendar className="icons-form" />
        <BiPlus className="icons-form" />
      </div>
      {isImageAdded && <Alert variant="success">Immagine aggiunta!</Alert>}
    </>
  );

  return (
    <Form onSubmit={doModify ? handleSubmitModify : handleSubmitCreate}>
      {changeOnlyImage ? (
        <section className="py-3 d-flex flex-column align-items-center justify-content-center">
          <img
            src={changeImagePicture}
            alt="Picture of a man changing picture"
          />
          <h5 className="mt-3">Per iniziare, seleziona il file</h5>
          <p className="small">Condividi un'immagine nel tuo post!</p>

          <label
            for="file-upload"
            className="mt-3 custom-file-upload bg-primary-subtle p-2 rounded-pill px-4 carica"
          >
            Carica immagine
          </label>
          <input
            id="file-upload"
            type="file"
            // className="fs-3"
            onChange={handleFileChange}
          />
          {isImageAdded && (
            <Alert variant="success" className="py-2 mb-0 mt-3 small">
              Immagine aggiunta!
            </Alert>
          )}
        </section>
      ) : (
        <Form.Group className="mb-3" controlId="text">
          {/* <Form.Label>Testo del Post</Form.Label> */}
          <Form.Control
            as="textarea"
            rows={7}
            name="text"
            value={formData.text}
            onChange={handleChange}
            className="border-0 fs-6"
            // placeholder="Scrivi qualcosa..."
            placeholder="Di cosa vorresti parlare?"
            required
          />
        </Form.Group>
      )}

      {keepAlert && (
        <>
          <Alert>
            Vuoi modificare anche l'immagine? Se sì, l'immagine precedente verrà
            persa.
          </Alert>
          <div className="d-flex justify-content-start gap-2">
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
      )}
      {!doModify && !changeOnlyImage && imageChanger}
      {doChangeImage && (
        <div className="d-flex align-items-center gap-2">
          <label for="file-upload" className="custom-file-upload d-flex gap-4">
            <BiImageAdd className="icons-form" />
          </label>
          <input
            id="file-upload"
            type="file"
            // className="fs-3"
            onChange={handleFileChange}
          />
          <div
            className="position-relative"
            onClick={() => setDeleteImage(true)}
          >
            <BiImage className="icons-form" />
            <i className="bi bi-x-lg position-absolute sovrapposto"></i>
          </div>
          {isImageAdded && (
            <Alert variant="success" className="py-2 mb-0">
              Immagine aggiunta!
            </Alert>
          )}
        </div>
      )}
      {deleteImage && (
        <>
          <Alert variant="danger">Eliminare l'immagine?</Alert>
          <div>
            <Button
              variant="success"
              className="px-3 me-2"
              onClick={() => {
                setDeleteImage(false);
                setMessageDeleteImage(true);
                dispatch(uploadPostImage(postInfo, null));
              }}
            >
              Sì
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                setDeleteImage(false);
              }}
            >
              No
            </Button>
          </div>
        </>
      )}
      {messageDeleteImage && (
        <Alert variant="success">Immagine eliminata!</Alert>
      )}
      <div className="d-flex justify-content-end mt-2">
        <Button
          variant="primary"
          type="submit"
          disabled={postsLoading}
          className="rounded-pill px-4"
          onClick={() => {
            setIsImageAdded(false);
          }}
        >
          {postsLoading ? "Pubblicando..." : "Pubblica"}
        </Button>
      </div>
    </Form>
  );
};

export default PostChanger;
