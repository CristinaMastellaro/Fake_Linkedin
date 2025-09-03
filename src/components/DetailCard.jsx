import { Card, Button, Badge, Spinner, Alert } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const DetailCard = ({ itemId, itemType }) => {
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchItemDetails = async () => {
      console.log('DetailCard - Received props:', { itemId, itemType })

      if (!itemId || !itemType) {
        console.error('Missing required props:', { itemId, itemType })
        setLoading(false)
        setError('ID or item type missing.')
        return
      }

      setLoading(true)
      setError(null)

      try {
        let apiUrl = ''

        switch (itemType) {
          case 'post':
            apiUrl = `https://striveschool-api.herokuapp.com/api/posts/${itemId}`
            break
          case 'experience':
            apiUrl = `https://striveschool-api.herokuapp.com/api/profile/experiences/${itemId}`
            break
          case 'profile':
            apiUrl = `https://striveschool-api.herokuapp.com/api/profile/${itemId}`
            break
          default:
            throw new Error('Unsupported content type')
        }

        // DEBUG: Controlla se l'URL è corretto
        console.log('API URL:', apiUrl)
        // DEBUG: Controlla se la chiave API è presente
        console.log('API Key present:', !!process.env.REACT_APP_API_KEY)

        console.log('Attempting to fetch from URL:', apiUrl)
        const response = await fetch(apiUrl, {
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFlM2FkOTYwMGJlMTAwMTgzYTg2OWEiLCJpYXQiOjE3MDU5MzI1MDUsImV4cCI6MTcwNzE0MjEwNX0.mVn1BOeFXHZYx2tBJ5pH7HibzEBWQXE8r1PR0DhzAQA',
            'Content-Type': 'application/json',
          },
        })

        console.log('Response status:', response.status)
        const data = await response.json()
        console.log('Received data:', data)
        setItem(data)
      } catch (err) {
        console.error('Fetch error:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchItemDetails()
  }, [itemId, itemType])

  const formatDate = (dateString) => {
    if (!dateString) return 'Data non disponibile'
    return new Date(dateString).toLocaleDateString('it-IT', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const renderPostDetails = () => (
    <>
      <Card.Header className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <img
            src={item.user?.image || '/default-avatar.png'}
            alt={item.user?.name || 'Utente'}
            className="rounded-circle me-2"
            style={{ width: '40px', height: '40px', objectFit: 'cover' }}
          />
          <div>
            <h6 className="mb-0">{item.user?.name || 'Utente sconosciuto'}</h6>
            <small className="text-muted">{item.user?.title || ''}</small>
          </div>
        </div>
        <Badge bg="primary">{itemType}</Badge>
      </Card.Header>

      <Card.Body>
        <Card.Text>{item.text}</Card.Text>

        {item.image && (
          <div className="text-center mb-3">
            <img
              src={item.image}
              alt="Post content"
              className="img-fluid rounded"
              style={{ maxHeight: '400px' }}
            />
          </div>
        )}

        <div className="text-muted small">
          <p>
            <strong>Pubblicato il:</strong> {formatDate(item.createdAt)}
          </p>
          {item.updatedAt && item.updatedAt !== item.createdAt && (
            <p>
              <strong>Modificato il:</strong> {formatDate(item.updatedAt)}
            </p>
          )}
          <p>
            <strong>ID Post:</strong> {item._id}
          </p>
        </div>
      </Card.Body>
    </>
  )

  const renderExperienceDetails = () => (
    <>
      <Card.Header className="d-flex justify-content-between align-items-center">
        <h5 className="mb-0">{item.role}</h5>
        <Badge bg="success">{itemType}</Badge>
      </Card.Header>

      <Card.Body>
        <h6 className="text-primary">{item.company}</h6>
        <p className="text-muted">{item.area}</p>
        <Card.Text>{item.description}</Card.Text>

        <div className="text-muted small">
          <p>
            <strong>Periodo:</strong> {formatDate(item.startDate)} -{' '}
            {item.endDate ? formatDate(item.endDate) : 'Presente'}
          </p>
          <p>
            <strong>ID Esperienza:</strong> {item._id}
          </p>
        </div>
      </Card.Body>
    </>
  )

  const renderProfileDetails = () => (
    <>
      <Card.Header className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <img
            src={item.image || '/default-avatar.png'}
            alt={item.name}
            className="rounded-circle me-2"
            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
          />
          <div>
            <h5 className="mb-0">
              {item.name} {item.surname}
            </h5>
            <p className="text-muted mb-0">{item.title}</p>
          </div>
        </div>
        <Badge bg="info">{itemType}</Badge>
      </Card.Header>

      <Card.Body>
        <Card.Text>{item.bio}</Card.Text>

        <div className="text-muted small">
          <p>
            <strong>Email:</strong> {item.email}
          </p>
          <p>
            <strong>Area:</strong> {item.area}
          </p>
          <p>
            <strong>Username:</strong> {item.username}
          </p>
          <p>
            <strong>ID Profilo:</strong> {item._id}
          </p>
        </div>
      </Card.Body>
    </>
  )

  if (loading) {
    return (
      <Card className="text-center p-4">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Caricamento...</span>
        </Spinner>
        <p className="mt-2">Caricamento dettagli...</p>
      </Card>
    )
  }

  if (error) {
    return (
      <Alert variant="danger">
        <Alert.Heading>Errore nel caricamento</Alert.Heading>
        <p>{error}</p>
        <Button variant="outline-danger" onClick={() => navigate(-1)}>
          Torna indietro
        </Button>
      </Alert>
    )
  }

  if (!item) {
    return (
      <Alert variant="warning">
        <Alert.Heading>Contenuto non trovato</Alert.Heading>
        <p>Il contenuto richiesto non è stato trovato.</p>
        <Button variant="outline-warning" onClick={() => navigate(-1)}>
          Torna indietro
        </Button>
      </Alert>
    )
  }

  return (
    <Card className="shadow-sm">
      {itemType === 'post' && renderPostDetails()}
      {itemType === 'experience' && renderExperienceDetails()}
      {itemType === 'profile' && renderProfileDetails()}

      <Card.Footer className="d-flex justify-content-between">
        <Button variant="outline-secondary" onClick={() => navigate(-1)}>
          Torna indietro
        </Button>
        <Button variant="primary" onClick={() => navigate('/')}>
          Vai alla Homepage
        </Button>
      </Card.Footer>
    </Card>
  )
}

export default DetailCard
