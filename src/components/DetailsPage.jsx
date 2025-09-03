import { Container, Row, Col, Collapse } from 'react-bootstrap'
import SidebarHome from './SidebarHome'
import LeftSidebarHome from './LeftSidebarHome'
import DetailCard from './DetailCard'
import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import '../css/footerHome.css'
import MyFooter from './MyFooter'

const DetailsPage = () => {
  const [showFooter, setShowFooter] = useState(false)
  const footerRef = useRef(null)
  const { type = 'post', id } = useParams() // Estrae type e id dall'URL
  useEffect(() => {
    console.log('DetailsPage - URL params:', { type, id })
  }, [type, id])
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        showFooter &&
        footerRef.current &&
        !footerRef.current.contains(event.target)
      ) {
        setShowFooter(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [showFooter])
  useEffect(() => {
    console.log('Rendering DetailsPage with:', { type, id })
  }, [type, id])

  return (
    <>
      <Container className="DetailsPage bg-light min-vh-100 py-4">
        <Row className="justify-content-center">
          <Col xs={12} md={4} lg={3}>
            <div className="position-fixed">
              <LeftSidebarHome />
            </div>
          </Col>
          <Col xs={12} md={8} lg={6}>
            {id ? (
              <DetailCard itemId={id} itemType={type} />
            ) : (
              <div>Nessun ID fornito</div>
            )}
          </Col>
          <Col xs={12} lg={3}>
            <SidebarHome />
          </Col>
        </Row>
      </Container>
      {showFooter && <div className="overlay-footer" />}
      <Collapse in={showFooter}>
        <div className="footer-dropup">
          <div className="d-flex justify-content-end">
            <button
              className="close-button fs-1"
              title="Chiudi"
              onClick={() => setShowFooter(false)}
            >
              &times;
            </button>
          </div>

          <MyFooter />
        </div>
      </Collapse>
    </>
  )
}

export default DetailsPage
