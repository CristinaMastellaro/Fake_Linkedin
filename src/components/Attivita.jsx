import { useEffect, useState } from "react";
import { Card, ButtonGroup, Button, Carousel } from "react-bootstrap";
import { BiRightArrowAlt } from "react-icons/bi";
import { TOKEN } from '../redux/actions';
import "../css/hero.css";
import "../css/Attività.css";

const chunkArray = (array, size) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

const Attivita = ({ isOwner, userId }) => {
  const [posts, setPosts] = useState([]);
  const slides = chunkArray(posts, 2);
    const [expandedPosts, setExpandedPosts] = useState({});

  const toggleExpand = (postId) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  useEffect(() => {
    if (!isOwner) {
      const fetchPosts = async () => {
        try {
          const bearer = TOKEN;
          const response = await fetch(`https://striveschool-api.herokuapp.com/api/posts?userId=${userId}`, {
            headers: {
              Authorization: `Bearer ${bearer}`,
            },
          });
          if (!response.ok) throw new Error("Errore caricamento post");
          const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Errore nel recupero dei post:", error);
      }
    };

      fetchPosts();
    }
  }, [isOwner, userId]);

  return (
    <Card className="border border-1 rounded-4 m-4 shadow">
      <Card.Body className="border-bottom">
        <Card.Title>Attività</Card.Title>
        <Card.Text className="d-flex align-items-center gap-1 opacity-75 myBlue">
          1364 follower
        </Card.Text>

        {isOwner ? (
          <>
            <div className="badge-info myBlue py-1">Crea un post</div>
            <div className="mt-4">
              <p className="mb-0 fw-bold">Non hai ancora pubblicato nulla</p>
              <p className="mb-0 small">I post che condividi appariranno qui</p>
            </div>
          </>
        ) : (
          <>
            <ButtonGroup className="mb-3 gap-2">
              <Button variant="success" className="rounded-pill" disabled>Post</Button>
              <Button variant="success-outline" className="rounded-pill" disabled>Commenti</Button>
              <Button variant="success-outline" className="rounded-pill" disabled>Immagini</Button>
            </ButtonGroup>

            {posts.filter(post => post.image).length > 0 ? (
              <Carousel className="custom-carousel">
                {slides.map((pair, index) => (
                  <Carousel.Item key={index} interval={5000}>
                    <div className="d-flex gap-3 justify-content-center align-items-stretch">
                      {pair.map((post) => (
                        <div className="card-body p-3">
                          {/* Header */}
                          <div className="d-flex align-items-center mb-2">
                            <img
                              src={post.user?.image || "https://avatar.iran.liara.run/public"}
                              alt="Profile" className="rounded-circle me-3"
                              style={{ width: "40px", height: "40px" }}
                            />

                            <div className="flex-grow-1">
                              <h6 className="mb-0 fw-bold">
                                {post.user?.name} {post.user?.surname}
                              </h6>

                              <small className="text-muted">
                                {post.user?.title} • Pubblicato il:{" "}
                                {new Date(post.createdAt).toLocaleString()}
                              </small>
                            </div>
                          </div>

                          {/* Testo */}
                          {post.text && (
                            <p
                              className={`mb-2 ${
                                post.image && !expandedPosts[post._id] ? "text-truncate" : ""
                              }`}
                              style={{ maxHeight: "3.6em", overflow: "hidden" }}
                            >
                              {post.text}
                            </p>
                          )}
                          {post.image && post.text?.length > 120 && (
                            <Button
                              variant="link" size="sm"
                              className="p-0" onClick={() => toggleExpand(post._id)}
                            >
                              {expandedPosts[post._id] ? "Mostra meno" : "Leggi di più"}
                            </Button>
                          )}

                          {/* Immagine */}
                          {post.image && (
                            <img
                              src={post.image} alt={post.text || "Post"}
                              className="img-fluid rounded mt-2"
                              style={{ maxHeight: "200px", objectFit: "cover", width: "100%" }}
                            />
                          )}

                          {/* Footer con reazioni e commenti */}
                          <div className="d-flex justify-content-between align-items-center mt-2 pt-2">
                            <small className="text-muted">
                              <i className="bi bi-hand-thumbs-up-fill text-primary"></i>{" "}
                              {post.reactions || Math.floor(Math.random() * 99) + 2} reazioni
                            </small>
                            <small className="text-muted">
                              {post.comments || Math.floor(Math.random() * 99) + 2} commenti
                            </small>
                          </div>

                          {/* Bottoni */}
                          <div className="d-flex justify-content-around mt-2 pt-2 border-top">
                            <button className="btn btn-light flex-fill me-1">
                              <i className="bi bi-hand-thumbs-up me-2"></i>
                            </button>
                            <button className="btn btn-light flex-fill me-1">
                              <i className="bi bi-chat-square-text me-2"></i>
                            </button>
                            <button className="btn btn-light flex-fill me-1">
                              <i className="bi bi-arrow-repeat me-2"></i>
                            </button>
                            <button className="btn btn-light flex-fill">
                              <i className="bi bi-send me-2"></i>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
            ) : (
              <p className="text-muted">Questo utente non ha ancora pubblicato immagini.</p>
            )}
          </>
        )}
      </Card.Body>

      <div className="fw-semibold d-flex align-items-center justify-content-center py-1 opacity-75">
        Mostra tutte le attività <BiRightArrowAlt className="ms-1" />
      </div>
    </Card>
  );
};

export default Attivita;
