import { useState } from "react";
import { Dropdown, Modal, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deletePostAction } from "../redux/actions";
import PostChanger from "./PostChanger";
import { useNavigate } from "react-router-dom";
import "../css/singlePost.css";

const SinglePost = ({ post, setCurrentPage }) => {
  const navigate = useNavigate();
  const myName = useSelector((state) => {
    return state.saveProfileMe.myProfile.name;
  });

  const [alert, setAlert] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  const dispatch = useDispatch();

  const [show, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  const [showModify, setShowModify] = useState(false);
  const handleCloseModify = () => setShowModify(false);
  const handleShowModify = () => setShowModify(true);

  const numReactions = Math.floor(Math.random() * 200);
  const numComments = Math.floor(Math.random() * 100);

  const handlePostClick = (e) => {
    if (e.target.closest(".dropdown") || e.target.closest(".dropdown-menu")) {
      e.stopPropagation();
      return;
    }

    if (!e.target.closest(".dropdown")) {
      navigate(`/details/post/${post._id}`);

      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    }
  };

  return (
    <div className="card mb-3 shadow-sm">
      <div onClick={handlePostClick} style={{ cursor: "pointer" }}>
        <div className="card-body">
          <div className="d-flex align-items-start mb-3">
            <img
              src={post.user?.image || "https://avatar.iran.liara.run/public"}
              alt="Profile"
              className="rounded-circle me-3"
              style={{ width: "50px", height: "50px" }}
            />
            <div className="flex-grow-1">
              <h6 className="mb-0 fw-bold">
                {post.user?.name} {post.user?.surname}
              </h6>
              <small className="text-muted">
                {post.user?.title} •{" "}
                {new Date(post.createdAt).toLocaleDateString()}
              </small>
            </div>
            {myName === post.user.name && (
              <Dropdown onClick={(e) => e.stopPropagation()}>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  <i className="bi bi-three-dots"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleShowModify}>
                    Modifica
                  </Dropdown.Item>
                  <Dropdown.Item variant="primary" onClick={handleShowDelete}>
                    Elimina
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>

          <p className="card-text">{post.text}</p>

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
      </div>

      <div className="card-body ">
        <div className="d-flex justify-content-between align-items-center pt-2">
          <small className="text-muted">
            <i className="bi bi-hand-thumbs-up-fill text-primary"></i>{" "}
            {numReactions} reazioni
          </small>
          <small className="text-muted">{numComments} commenti</small>
        </div>

        <div className="d-flex justify-content-around mt-2 pt-2 border-top">
          <button
            className="btn btn-light flex-fill me-1"
            onClick={handleLikeClick}
          >
            <i
              className={`bi bi-hand-thumbs-up-fill me-2 ${
                isLiked ? "text-primary" : ""
              }`}
            ></i>
            <span className={isLiked ? "text-primary" : ""}>Mi piace</span>
          </button>
          <button className="btn btn-light flex-fill me-1">
            <i className="bi bi-chat-square-text-fill me-2"></i>Commenta
          </button>
          <button className="btn btn-light flex-fill me-1">
            <i className="bi bi-arrow-repeat me-2"></i>Condividi
          </button>
          <button className="btn btn-light flex-fill">
            <i className="bi bi-send me-2"></i>Invia
          </button>
        </div>
        <div className="d-flex align-items-center mt-2 pt-2 ">
          <img
            src="/profile-icon.png"
            alt="Profile"
            className="rounded-circle me-2"
            style={{ width: "32px", height: "32px" }}
          />
          <div className="flex-fill position-relative">
            <input
              type="text"
              className="form-control rounded-pill"
              placeholder="Aggiungi un commento..."
              style={{
                paddingRight: "40px",
                backgroundColor: "#f0f2f5",
                border: "none",
              }}
            />
            <button
              className="btn position-absolute end-0 top-50 translate-middle-y me-2"
              style={{ border: "none", background: "transparent" }}
            >
              <i className="bi bi-emoji-smile text-muted me-3"></i>
              <i className="bi bi-card-image"></i>
            </button>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Attenzione!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Sei sicuro di voler cancellare il post?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            No
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              dispatch(deletePostAction(post._id));
              handleCloseDelete;
            }}
            className="px-3"
          >
            Sì
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModify} onHide={handleCloseModify} centered>
        <Modal.Header closeButton>
          <Modal.Title>Modifica Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {alert && <Alert variant={alert.type}>{alert.message}</Alert>}
          <PostChanger
            setAlert={setAlert}
            handleCloseModal={handleCloseModify}
            setCurrentPage={() => setCurrentPage}
            doModify={true}
            postInfo={post}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SinglePost;
