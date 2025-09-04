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
          3 follower
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
                        <div
                          key={post._id}
                          className="post-card d-flex flex-column"
                          style={{
                            border: "1px solid #ddd", borderRadius: "10px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)", width: "48%",
                            maxHeight: "300px", overflow: "hidden", backgroundColor: "#fff",
                          }}
                        >
                          {/* Testo sopra */}
                          <div style={{ padding: "1rem", flexShrink: 0 }}>
                            {post.text && (
                              <>
                                <h5
                                  className={`mb-2 ${
                                    post.image && !expandedPosts[post._id] ? "line-clamp" : ""
                                  }`} style={{ fontSize: "1rem" }}
                                >
                                  {post.text}
                                </h5>

                                {/* Mostra il bottone "Leggi di più" solo se c'è immagine e testo lungo */}
                                {post.image && post.text.length > 120 && (
                                  <Button variant="link" size="sm" className="p-0" onClick={() => toggleExpand(post._id)}>
                                    {expandedPosts[post._id] ? "Mostra meno" : "Leggi di più"}
                                  </Button>
                                )}
                              </>
                            )}
                          </div>

                          {/* Immagine sotto (solo se presente) */}
                          {post.image && (
                            <div style={{ flex: 1, borderTop: "1px solid #ddd" }}>
                              <img
                                src={post.image}
                                alt={post.text || "Post"}
                                style={{ width: "100%", height: "300px", objectFit: "cover", }}
                              />
                            </div>
                          )}
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
