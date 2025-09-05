import {
  Card,
  Row,
  Col,
  Carousel,
  Button,
  Modal,
  Form,
  Alert,
  Spinner,
} from 'react-bootstrap'
import '../css/hero.css'
import { BiCheckShield, BiPencil, BiX, BiSolidCamera } from 'react-icons/bi'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { fetchProfile, uploadProfileImage } from '../redux/actions'

const Hero = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { myProfile, otherProfile, loading } = useSelector(
    (state) => state.saveProfileMe
  )

  const profileData = id ? otherProfile : myProfile
  const userId = profileData?._id

  const [showModal, setShowModal] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [alert, setAlert] = useState(null)
  const fileInputRef = useRef(null)

  const handleCameraClick = () => {
    if (!id) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      setShowModal(true)
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setImageFile(null)
    setAlert(null)
  }

  const handleUpload = async () => {
    if (!userId || !imageFile) {
      setAlert({ type: 'danger', message: 'File o User ID mancante.' })
      return
    }
    try {
      await dispatch(uploadProfileImage(userId, imageFile))
      setAlert({
        type: 'success',
        message: 'Immagine del profilo caricata con successo.',
      })
      setTimeout(() => {
        handleCloseModal()
      }, 1500)
    } catch (error) {
      setAlert({
        type: 'danger',
        message: error.message || "Errore nel caricamento dell'immagine.",
      })
    }
  }

  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const handleShowUpgradeModal = () => setShowUpgradeModal(true)
  const handleCloseUpgradeModal = () => setShowUpgradeModal(false)
  const [editName, setEditName] = useState('')
  const [editSurname, setEditSurname] = useState('')
  const [editSummary, setEditSummary] = useState('')
  const [editCity, setEditCity] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (profileData) {
      setEditName(profileData.name || '')
      setEditSurname(profileData.surname || '')
      setEditSummary(profileData.title || '')
      setEditCity(profileData.area || '')
    }
  }, [profileData])

  const handleSave = async () => {
    if (!userId) {
      setAlert({ type: 'danger', message: 'User ID mancante.' })
      return
    }

    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGI1YTFkOTE2MjdjNjAwMTVmOGM1NmMiLCJpYXQiOjE3NTY3MzM5MTMsImV4cCI6MTc1Nzk0MzUxM30.SOLseepU4Ysb0KnFQYR3yWP1jikhGc89-HCynCKAhuY'
    if (!token) {
      setAlert({
        type: 'danger',
        message: 'Token mancante. Effettua il login.',
      })
      return
    }

    const profileToUpdate = {
      name: editName,
      surname: editSurname,
      title: editSummary,
      area: editCity,
    }

    try {
      setIsSaving(true)
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/profile/`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(profileToUpdate),
        }
      )

      if (!response.ok) {
        const contentType = response.headers.get('Content-Type')
        if (contentType && contentType.includes('text/html')) {
          const errorMessage =
            'Errore di rete o token scaduto. Verifica il login.'
          setAlert({ type: 'danger', message: errorMessage })
          return
        }

        const errorData = await response.json()
        const errorMessage =
          errorData.message || "Errore durante l'aggiornamento."
        setAlert({ type: 'danger', message: errorMessage })
        return
      } else {
        dispatch(fetchProfile())
      }

      setAlert({ type: 'success', message: 'Profilo aggiornato con successo!' })

      setTimeout(() => {
        setAlert({})
        handleCloseUpgradeModal()
      }, 1500)
    } catch (error) {
      setAlert({
        type: 'danger',
        message: error.message || "Errore durante l'aggiornamento del profilo.",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Card className="border border-1 rounded-4 m-4 position-relative shadow">
      <Card.Img
        variant="top"
        className="hero-img"
        src="https://png.pngtree.com/background/20230408/original/pngtree-mountain-view-in-the-morning-picture-image_2336856.jpg"
      />
      <div className="picture-profile">
        {profileData && profileData.image && (
          <img src={profileData.image} alt="Picture profile" />
        )}
      </div>
      {!id && (
        <div
          className="picture-photocamera"
          onClick={handleCameraClick}
          style={{ cursor: !id ? 'pointer' : 'default' }}
        >
          <BiSolidCamera />
        </div>
      )}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: 'none' }}
      />
      <Card.Body className="container-fluid mt-5">
        <Row>
          <Col xs={12} md={6}>
            <Card.Title>
              {profileData && profileData.name + ' ' + profileData.surname}
            </Card.Title>
            {!id && (
              <div className="badge-verifica rounded-4 px-2 d-flex align-items-center">
                <BiCheckShield className="fs-5 me-1" /> Aggiungi badge di
                verifica
              </div>
            )}
            <Card.Text className="mb-0">
              {profileData && profileData.title}
            </Card.Text>
            <p className="d-md-none my-0 opacity-75 small">
              {profileData && profileData.area
                ? `Università degli Studi di ${profileData.area.split(',')[0]}`
                : 'Università degli Studi'}
            </p>
            <div className="d-flex gap-1 my-1 flex-wrap">
              <p className="my-0 opacity-75 small">
                {profileData && profileData.area}
              </p>
              <p className="my-0 ">·</p>
              <p className="my-0 myBlue small">Informazioni di contatto</p>
            </div>
            <p className="my-0 myBlue small">3 collegamenti</p>
          </Col>
          <Col
            xs={6}
            lg={6}
            className="d-flex gap-2 d-none d-md-block justify-content-end"
          >
            <img
              src="https://seeklogo.com/images/U/universita-degli-studi-di-padova-logo-D71B2107E1-seeklogo.com.png"
              alt="Logo uni"
              className="logo-uni"
            />
            <span className="fw-semibold ms-1">
              {profileData && profileData.area
                ? `Università degli Studi di ${profileData.area.split(',')[0]}`
                : 'Università degli Studi'}
            </span>
            {!id && (
              <BiPencil
                className="position-absolute top-0 end-0 me-3"
                style={{
                  cursor: 'pointer',
                  fontSize: '1.5rem',
                  marginTop: '18%',
                }}
                onClick={handleShowUpgradeModal}
              />
            )}
          </Col>
        </Row>
        {!id && (
          <div className="mt-3 d-flex flex-wrap gap-2">
            <div className="badge-info badge-active" title="Not available">
              Disponibile per
            </div>
            <div className="badge-info myBlue" title="Not available">
              Aggiungi sezione del profilo
            </div>
            <div className="badge-info myBlue" title="Not available">
              Migliora profilo
            </div>
            <div className="badge-info border-black" title="Not available">
              Risorse
            </div>
          </div>
        )}
        {!id && (
          <Carousel data-bs-theme="dark" className="d-sm-none">
            <Carousel.Item interval={120000}>
              <img
                className="d-block w-100 carousel-img-info"
                alt="First slide"
                src="https://t3.ftcdn.net/jpg/03/53/11/00/360_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg"
              />
              <Carousel.Caption className="container border p-3 rounded-3 border-opacity-25 first-item-carousel carousel-info">
                <div>
                  <Row>
                    <Col xs={11}>
                      <p className="mb-0 fw-semibold">Disponibile a lavorare</p>
                    </Col>
                    <Col xs={1}>
                      <div>
                        <BiPencil className="img-carousel" />
                      </div>
                    </Col>
                  </Row>
                  <p className="mb-0">Ruoli di Laureato</p>
                  <p className="myBlue mb-0">Mostra dettagli</p>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={120000}>
              <img
                className="d-block w-100 carousel-img-info"
                alt="Second slide"
                src="https://t3.ftcdn.net/jpg/03/53/11/00/360_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg"
              />
              <Carousel.Caption className="container border p-3 rounded-3 border-opacity-25 carousel-info">
                <Row>
                  <Col xs={11}>
                    <div>
                      <span className="fw-semibold">
                        Metti in risalto i tuoi servizi
                      </span>{' '}
                      in un'apposita sezione sul tuo profilo, così sarà più
                      facile trovarti.
                    </div>
                    <p className="myBlue mb-0">Inizia</p>
                  </Col>
                  <Col xs={1}>
                    <BiX className="img-carousel" />
                  </Col>
                </Row>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        )}
        {!id && (
          <Row className="mt-3 d-none d-sm-flex">
            <Col className="myCarousel first-item-carousel small border border-opacity-10">
              <div>
                <Row>
                  <Col xs={11}>
                    <p className="mb-0 fw-semibold">Disponibile a lavorare</p>
                  </Col>
                  <Col xs={1}>
                    <div>
                      <BiPencil className="img-carousel" />
                    </div>
                  </Col>
                </Row>
                <p className="mb-0">Ruoli di Laureato</p>
                <p className="myBlue mb-0">Mostra dettagli</p>
              </div>
            </Col>
            <Col className="myCarousel small">
              <Row>
                <Col xs={11}>
                  <div>
                    <span className="fw-semibold">
                      Metti in risalto i tuoi servizi
                    </span>{' '}
                    in un'apposita sezione sul tuo profilo, così sarà più facile
                    trovarti.
                  </div>
                  <p className="myBlue mb-0">Inizia</p>
                </Col>
                <Col xs={1}>
                  <BiX className="img-carousel" />
                </Col>
              </Row>
            </Col>
          </Row>
        )}
        {/* <Button variant="primary">Go somewhere</Button> */}
      </Card.Body>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Cambia Immagine del Profilo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {alert && <Alert variant={alert.type}>{alert.message}</Alert>}
          {imageFile && (
            <div className="text-center mb-3">
              <img
                src={URL.createObjectURL(imageFile)}
                alt="Preview"
                className="img-fluid rounded"
                style={{ maxHeight: '200px', maxWidth: '100%' }}
              />
            </div>
          )}
          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={handleCloseModal}>
              Annulla
            </Button>
            <Button variant="primary" onClick={handleUpload} disabled={loading}>
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Caricamento...
                </>
              ) : (
                'Carica'
              )}
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={showUpgradeModal} onHide={handleCloseUpgradeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Modifica presentazione</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {alert && (
            <Alert variant={alert.type} aria-live="assertive">
              {alert.message}
            </Alert>
          )}

          <p className="text-muted">* indica che è obbligatorio</p>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nome*</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci il tuo nome"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Cognome*</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci il tuo cognome"
                value={editSurname}
                onChange={(e) => setEditSurname(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Sommario*</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci il tuo sommario"
                value={editSummary}
                onChange={(e) => setEditSummary(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Città*</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci la tua città"
                value={editCity}
                onChange={(e) => setEditCity(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Formazione*</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci la tua formazione"
                value={editCity}
                onChange={(e) => setEditCity(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Salvataggio...
              </>
            ) : (
              'Salva'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  )
}

export default Hero
