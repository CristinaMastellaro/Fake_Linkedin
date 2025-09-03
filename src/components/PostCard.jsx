import { Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const PostCard = ({ post }) => {
  const navigate = useNavigate()

  const handleCardClick = () => {
    console.log('Card clicked! Post:', post) // Debug log

    const postId = post._id || post.id
    console.log('Post ID:', postId) // Debug log

    if (!postId) {
      console.error('No ID found in post:', post)
      return
    }

    const targetUrl = `/details/post/${postId}`
    console.log('Navigating to:', targetUrl) // Debug log

    navigate(targetUrl)
  }

  // Debug: verifica che il post esista
  if (!post) {
    console.error('Post is undefined!')
    return <div>Error: Post data missing</div>
  }

  return (
    <Card
      className="mb-3 shadow-sm"
      style={{
        cursor: 'pointer',
        border: '2px solid #007bff', // Bordo blu per identificare facilmente la card
      }}
      onClick={handleCardClick}
    >
      <Card.Header>
        <div className="d-flex align-items-center">
          <img
            src={post.user?.image || '/default-avatar.png'}
            alt={post.user?.name || 'Utente'}
            className="rounded-circle me-2"
            style={{ width: '40px', height: '40px', objectFit: 'cover' }}
          />
          <div>
            <h6 className="mb-0">{post.user?.name || 'Utente sconosciuto'}</h6>
            <small className="text-muted">
              {post.createdAt
                ? new Date(post.createdAt).toLocaleDateString('it-IT')
                : 'Data non disponibile'}
            </small>
          </div>
        </div>
        {/* Badge per indicare che è cliccabile */}
        <span className="badge bg-success">CLICCA QUI</span>
      </Card.Header>

      <Card.Body>
        <Card.Text>{post.text || 'Nessun testo disponibile'}</Card.Text>

        {post.image && (
          <div className="text-center">
            <img
              src={post.image}
              alt="Post content"
              className="img-fluid rounded"
              style={{ maxHeight: '200px' }}
            />
          </div>
        )}

        {/* Debug info */}
        <small className="text-muted">
          Post ID: {post._id || post.id || 'NO ID FOUND'}
        </small>
      </Card.Body>
    </Card>
  )
}

export default PostCard
