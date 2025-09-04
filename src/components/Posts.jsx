import { Card, Row, Col, Button, Modal, Alert, Spinner } from "react-bootstrap";
import { BiPlus } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchPosts } from "../redux/actions";
import "../css/services.css";
import SinglePost from "./SinglePost";
import PostChanger from "./PostChanger";

const Posts = () => {
  const dispatch = useDispatch();
  const { posts, postsLoading, postsError } = useSelector(
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
      <Card className="border border-1 rounded-3 my-4 position-relative">
        <Card.Body className="border-bottom container">
          <Row className="mb-3">
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
              <SinglePost
                post={post}
                key={post._id}
                setCurrentPage={() => setCurrentPage}
              />
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
          <PostChanger
            setAlert={setAlert}
            handleCloseModal={handleCloseModal}
            setCurrentPage={() => setCurrentPage}
            doModify={false}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Posts;
