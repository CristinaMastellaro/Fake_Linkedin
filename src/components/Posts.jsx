import { Card, Button, Modal, Alert, Spinner } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { createPost, fetchPosts, setPageAction } from '../redux/actions'
import '../css/services.css'
import SinglePost from './SinglePost'
import PostChanger from './PostChanger'
import '../css/postChanger.css'

const Posts = () => {
  const dispatch = useDispatch()
  const { posts, postsLoading, postsError, myProfile, setPageHome } =
    useSelector((state) => state.saveProfileMe)

  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    text: '',
  })
  const [imageFile, setImageFile] = useState(null)
  const [alert, setAlert] = useState(null)
  const [currentPage, setCurrentPage] = useState(setPageHome)
  const postsPerPage = 5 // mostra 5 post per pagina

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  useEffect(() => {
    setCurrentPage(setPageHome)
  }, [setPageHome])

  const createPostOnlyText = async () => {
    await dispatch(createPost(formData, ''))

    setAlert({ type: 'success', message: 'Post creato con successo.' })
    dispatch(fetchPosts())
    // Torna alla prima pagina dopo la creazione del post
    setCurrentPage(1)
    handleCloseCreate()
  }

  const [changeOnlyImage, setChangeOnlyImage] = useState(false)
  const [showModalCreate, setShowModalCreate] = useState(false)

  const handleCloseCreate = () => {
    setShowModalCreate(false)
    setFormData({ text: '' })
    setAlert(null)
  }

  const handleShowModal = () => {
    setFormData({ text: '' })
    setImageFile(null)
    setAlert(null)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setFormData({ text: '' })
    setImageFile(null)
    setAlert(null)
    setChangeOnlyImage(false)
  }

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)
  const totalPages = Math.ceil(posts.length / postsPerPage)

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
      dispatch(setPageAction(currentPage + 1))
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
      dispatch(setPageAction(currentPage - 1))
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleFirstPage = () => {
    setCurrentPage(1)
    dispatch(setPageAction(1))
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 0)
  }

  const handleLastPage = () => {
    setCurrentPage(totalPages)
    dispatch(setPageAction(totalPages))
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 0)
  }

  return (
    <>
      <div className="card mb-3 shadow-sm">
        <div className="card-body">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setShowModalCreate(true)
            }}
          >
            <div className="d-flex align-items-center mb-3">
              <img
                src="/profile-icon.png"
                alt="Profile"
                className="rounded-circle me-3"
                style={{ width: '50px', height: '50px' }}
              />
              <input
                type="text"
                className="form-control rounded-pill"
                placeholder="Crea un post"
                value={formData.text}
                onChange={(e) => {
                  setFormData({ text: e.target.value })
                }}
                style={{ backgroundColor: '#f3f2ef', border: 'none' }}
              />
            </div>
          </form>
          <div className="d-flex justify-content-around">
            <button
              className="btn btn-light d-flex align-items-center"
              onClick={() => {
                handleShowModal()
                setChangeOnlyImage(true)
              }}
            >
              <i className="bi bi-camera-video text-primary me-2"></i>
              Video
            </button>
            <button
              className="btn btn-light d-flex align-items-center"
              onClick={() => {
                handleShowModal()
                setChangeOnlyImage(true)
              }}
            >
              <i className="bi bi-image text-success me-2"></i>
              Foto
            </button>
            <button
              className="btn btn-light d-flex align-items-center"
              onClick={handleShowModal}
            >
              <i className="bi bi-pencil-square text-warning me-2"></i>
              Scrivi un articolo
            </button>
          </div>
        </div>
      </div>
      <Card className="border border-1 rounded-3 my-4 position-relative">
        <Card.Body className="border-bottom container">
          <Card.Title>Post</Card.Title>

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
          <div className="d-flex align-items-center gap-3">
            <img
              src={myProfile.image}
              alt="Profile picture"
              className="picture-new-post"
            />
            <div>
              <p className="mb-0 fw-bold fs-5 line lh-2">
                {myProfile.name} {myProfile.surname}
              </p>
              <p className="mb-0 small opacity-75 fs-7">Crea nuovo post</p>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          {alert && <Alert variant={alert.type}>{alert.message}</Alert>}
          <PostChanger
            setAlert={setAlert}
            handleCloseModal={handleCloseModal}
            setCurrentPage={() => setCurrentPage}
            doModify={false}
            myProfile={myProfile}
            changeOnlyImage={changeOnlyImage}
          />
        </Modal.Body>
      </Modal>

      <Modal show={showModalCreate} onHide={handleCloseCreate} centered>
        <Modal.Header closeButton>
          <Modal.Title>Vuoi creare un nuovo post?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {alert && <Alert variant={alert.type}>{alert.message}</Alert>}
          <div className="mb-4">
            <span className="fw-semibold">Contenuto</span>: <br />
            {formData.text}
          </div>
          <div className="d-flex justify-content-end gap-2">
            <Button variant="danger" onClick={handleCloseCreate}>
              No
            </Button>
            <Button variant="success px-3" onClick={createPostOnlyText}>
              Sì
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Posts
