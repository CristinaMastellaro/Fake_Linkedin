import { Card, Button, Spinner, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TOKEN } from "../redux/actions";

const DetailCard = ({ itemId, itemType }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const numReactions = Math.floor(Math.random() * 200);
  const numComments = Math.floor(Math.random() * 100);

  useEffect(() => {
    const fetchItemDetails = async () => {
      console.log("Fetching details for:", { itemId, itemType });

      if (!itemId || !itemType) {
        setError("ID o tipo elemento mancante");
        setLoading(false);
        return;
      }

      try {
        // Prima fetch per ottenere il post
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
        console.log("Post data:", postData);

        setItem(postData); // Prima settiamo i dati del post

        // Poi prendiamo i dati dell'utente se abbiamo un user._id
        if (postData.user && postData.user._id) {
          const userResponse = await fetch(
            `https://striveschool-api.herokuapp.com/api/profile/me`,
            {
              headers: {
                Authorization: `Bearer ${TOKEN}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (userResponse.ok) {
            const userData = await userResponse.json();
            setItem((prev) => ({
              ...prev,
              user: { ...prev.user, ...userData },
            }));
          }
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [itemId, itemType]);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
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
          src={
            item.user?.image ||
            "https://avatar.iran.liara.run/public://via.placeholder.com/40"
          }
          alt="Profile"
          className="rounded-circle me-3"
          style={{ width: "50px", height: "50px" }}
        />
        <div>
          <h5 className="mb-0">
            {item.user?.name} {item.user?.surname}
          </h5>
          <small className="text-muted">
            {item.user?.title || "Utente LinkedIn"}
          </small>
        </div>
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

      <Card.Footer className="bg-white py-3">
        <Button variant="outline-primary" onClick={handleGoBack}>
          <i className="bi bi-arrow-left me-2"></i>
          Torna indietro
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default DetailCard;
