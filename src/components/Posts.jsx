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
import { BiPlus, BiCamera } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchPosts, createPost, uploadPostImage } from "../redux/actions";
import "../css/services.css";

const Posts = () => {
  const dispatch = useDispatch();
  const { posts, postsLoading, postsError, myProfile } = useSelector(
    (state) => state.saveProfileMe
  );

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    text: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [alert, setAlert] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5; // mostra 5 post per pagina

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleShowModal = () => {
    setFormData({ text: "" });
    setImageFile(null);
    setAlert(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ text: "" });
    setImageFile(null);
    setAlert(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.text.trim()) {
      setAlert({
        type: "danger",
        message: "Il testo del post è obbligatorio.",
      });
      return;
    }
    try {
      const action = await dispatch(createPost(formData));
      if (imageFile && action.payload && action.payload._id) {
        await dispatch(uploadPostImage(action.payload._id, imageFile));
      }
      setAlert({ type: "success", message: "Post creato con successo." });
      dispatch(fetchPosts());
      setCurrentPage(1); // Torna alla prima pagina dopo la creazione del post
      handleCloseModal();
    } catch (error) {
      setAlert({
        type: "danger",
        message: error.message || "Errore nella creazione del post.",
      });
    }
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  return (
    <>
      <Card className="border border-1 rounded-4 m-4 position-relative">
        <Card.Body className="border-bottom container">
          <Row>
            <Col xs={10}>
              <Card.Title>Post</Card.Title>
            </Col>
            <Col xs={2} className="d-flex gap-2 justify-content-end">
              <Button variant="light" onClick={handleShowModal}>
                <BiPlus className="fs-3" />
              </Button>
            </Col>
          </Row>

          {postsLoading && (
            <div className="d-flex justify-content-center my-3">
              <Spinner animation="border" />
            </div>
          )}

          {postsError && (
            <Alert variant="danger" className="mt-3">
              {postsError}
            </Alert>
          )}

          {!postsLoading && posts.length === 0 && (
            <div className="mt-3 text-muted">
              <p className="mb-0">Nessun post disponibile</p>
            </div>
          )}

          {!postsLoading &&
            currentPosts.map((post) => (
              <div key={post._id} className="mt-3 border-bottom pb-3">
                <div className="d-flex align-items-center mb-2">
                  <img
                    src={
                      post.user?.image ||
                      myProfile?.image ||
                      "https://via.placeholder.com/40"
                    }
                    alt="Profile"
                    className="rounded-circle me-2"
                    style={{ width: "40px", height: "40px" }}
                  />
                  <div>
                    <p className="mb-0 fw-semibold">
                      {post.user?.name} {post.user?.surname}
                    </p>
                    <p className="mb-0 text-muted small">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <p className="mb-2">{post.text}</p>
                {post.image && (
                  <img
                    src={post.image}
                    alt="Post"
                    className="img-fluid rounded"
                    style={{
                      maxHeight: "300px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                )}
              </div>
            ))}

          {!postsLoading && posts.length > postsPerPage && (
            <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
              <div className="d-flex gap-2">
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={handleFirstPage}
                  disabled={currentPage === 1}
                >
                  Prima
                </Button>
                <Button
                  variant="outline-primary"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                >
                  Precedente
                </Button>
              </div>
              <span className="text-muted">
                Pagina {currentPage} di {totalPages}
              </span>
              <div className="d-flex gap-2">
                <Button
                  variant="outline-primary"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Successivo
                </Button>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={handleLastPage}
                  disabled={currentPage === totalPages}
                >
                  Ultima
                </Button>
              </div>
            </div>
          )}
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Crea Nuovo Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {alert && <Alert variant={alert.type}>{alert.message}</Alert>}
          <Form onSubmit={handleSubmit}>
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
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Posts;
