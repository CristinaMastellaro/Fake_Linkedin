import { Card, Button, Spinner, Alert, Dropdown, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletePostAction, TOKEN } from "../redux/actions/index";
import PostChanger from "./PostChanger";

const DetailCard = ({ itemId, itemType, post, setCurrentPage }) => {
  const dispatch = useDispatch();
  const myName = useSelector((state) => {
    return state.saveProfileMe.myProfile.name;
  });
  const isMyPost = myName === post?.user?.name;

  const [isModified, setIsModified] = useState(false);
  const [show, setShowDelete] = useState(false);
  const [showModify, setShowModify] = useState(false);
  const [alert, setAlert] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [reactions, setReactions] = useState(
    () => Math.floor(Math.random() * 99) + 2 // 2–100
  );
  const [comments, setComments] = useState(
    () => Math.floor(Math.random() * 99) + 2 // 2–100
  );

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItemDetails = async () => {
      if (!itemId) {
        setError("ID o tipo elemento mancante");
        setLoading(false);
        return;
      }

      try {
        const postResponse = await fetch(
          `https://striveschool-api.herokuapp.com/api/posts/${itemId}`,
          {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!postResponse.ok) {
          throw new Error(`HTTP error! status: ${postResponse.status}`);
        }

        const postData = await postResponse.json();
        console.log("postData raw:", postData);

        if (typeof postData.user === "string" && postData.user) {
          try {
            const userResponse = await fetch(
              `https://striveschool-api.herokuapp.com/api/profile/${postData.user}`,
              {
                headers: {
                  Authorization: `Bearer ${TOKEN}`,
                  "Content-Type": "application/json",
                },
              }
            );

            if (userResponse.ok) {
              const userData = await userResponse.json();
              setItem({ ...postData, user: userData });
            } else {
              // Handle case where user data fetch fails but post is available
              console.warn(
                "Failed to fetch user data, displaying post without profile info."
              );
              setItem(postData);
            }
          } catch (userError) {
            console.error("Error fetching user data:", userError);
            setItem(postData);
          }
        } else {
          setItem(postData);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [itemId, isModified]);

  const handleLikeClick = () => {
    const increment = Math.floor(Math.random() * 15) + 1;
    setReactions((prev) => prev + increment);
    setIsLiked(!isLiked);
  };

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);
  const handleCloseModify = () => {
    setIsModified(true);
    setShowModify(false);
  };
  const handleShowModify = () => setShowModify(true);

  const handleProfileClick = () => {
    if (item?.user?._id) {
      navigate(`/profile/${item.user._id}`);
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    } else if (typeof item?.user === "string") {
      // Fallback for cases where the second fetch failed
      navigate(`/profile/${item.user}`);
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    }
  };

  if (loading) {
    return (
      <Card className="text-center p-4">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Caricamento...</span>
        </Spinner>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert variant="danger">
        <Alert.Heading>Errore</Alert.Heading>
        <p>{error}</p>
        <Button variant="outline-danger" onClick={() => navigate(-1)}>
          Torna indietro
        </Button>
      </Alert>
    );
  }

  if (!item) {
    return (
      <Alert variant="warning">
        <Alert.Heading>Contenuto non trovato</Alert.Heading>
        <p>Il contenuto richiesto non è disponibile.</p>
        <Button variant="outline-warning" onClick={() => navigate(-1)}></Button>
      </Alert>
    );
  }

  const handleGoBack = () => {
    navigate(-1);
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  };

  return (
    <Card className="shadow">
      <Card.Header className="d-flex align-items-center">
        <img
          src={item.user?.image || "https://avatar.iran.liara.run/public"}
          alt="Profile"
          className="rounded-circle me-3"
          style={{ width: "50px", height: "50px", cursor: "pointer" }}
          onClick={handleProfileClick}
        />
        <div className="flex-grow-1">
          <h5
            className="mb-0"
            style={{ cursor: "pointer" }}
            onClick={handleProfileClick}
          >
            {item.user?.name || item.user || "Utente Sconosciuto"}{" "}
            {item.user?.surname || ""}
          </h5>
          <small className="text-muted">
            {item.user?.title || "Utente LinkedIn"}
          </small>
        </div>
        {isMyPost && (
          <Dropdown>
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              <i className="bi bi-three-dots"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={handleShowModify}>Modifica</Dropdown.Item>
              <Dropdown.Item variant="primary" onClick={handleShowDelete}>
                Elimina
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </Card.Header>

      <Card.Body>
        <Card.Text>{item.text}</Card.Text>
        {item.image && (
          <div className="text-center mb-3">
            <img
              src={item.image}
              alt="Post content"
              className="img-fluid rounded"
              style={{ maxHeight: "400px" }}
            />
          </div>
        )}
        <div className="text-muted small">
          <p>
            Pubblicato il: {new Date(item.createdAt).toLocaleString("it-IT")}
          </p>
        </div>
      </Card.Body>

      <div className="card-body ">
        <div className="d-flex justify-content-between align-items-center pt-2">
          <small className="text-muted">
            <i className="bi bi-hand-thumbs-up-fill text-primary"></i>{" "}
            {reactions} reazioni
          </small>
          <small className="text-muted">{comments} commenti</small>
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

        <div className="d-flex align-items-center mt-2 pt-2">
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

      <Card.Footer className="bg-white py-3 border-top-0">
        <Button variant="outline-primary" onClick={handleGoBack}>
          <i className="bi bi-arrow-left me-2"></i>
          Torna indietro
        </Button>
      </Card.Footer>

      {/* Modals for edit/delete */}
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
              dispatch(deletePostAction(item._id, true));
              handleCloseDelete();
              handleGoBack();
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
            setCurrentPage={setCurrentPage}
            doModify={true}
            postInfo={item}
          />
        </Modal.Body>
      </Modal>
    </Card>
  );
};

export default DetailCard;
