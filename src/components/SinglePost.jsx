import { useState } from "react";
import { useSelector } from "react-redux";

const SinglePost = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  const numReactions = Math.floor(Math.random() * 200);
  const numComments = Math.floor(Math.random() * 100);

  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <div className="d-flex align-items-start mb-3">
          <img
            // src="https://avatar.iran.liara.run/public/boy"
            src={post.user?.image || "https://via.placeholder.com/40"}
            alt="Profile"
            className="rounded-circle me-3"
            style={{ width: "50px", height: "50px" }}
          />
          <div className="flex-grow-1">
            <h6 className="mb-0 fw-bold">
              {post.user?.name} {post.user?.surname}
            </h6>
            <small className="text-muted">
              Senior Developer presso TechCorp •{" "}
              {new Date(post.createdAt).toLocaleDateString()}
            </small>
          </div>
          <div className="dropdown">
            <button className="btn btn-link text-muted" type="button">
              <i className="bi bi-three-dots"></i>
            </button>
          </div>
        </div>

        <p className="card-text">{post.text}</p>

        {/* <img
          src="https://blog.differentacademy.it/wp-content/uploads/sites/2/2021/12/team-working-lavoro-squadra-copertina.jpg"
          alt="Post content"
          className="img-fluid mb-3"
        /> */}

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
    </div>
  );
};

export default SinglePost;
