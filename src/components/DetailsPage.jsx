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
  const { type, id } = useParams() // Estrae type e id dall'URL

  useEffect(() => {
    // Reset dello scroll quando il componente viene montato
    window.scrollTo(0, 0)
  }, []) // Empty dependency array ensures this runs only once when component mounts

  useEffect(() => {
    console.log('Detail params:', { type, id })
  }, [type, id])

  return (
    <>
      <Container className="DetailsPage bg-light min-vh-100 py-4">
        <Row className="justify-content-center">
          <Col xs={12} md={4} lg={3}>
            <div style={{ position: 'sticky', top: '76px' }}>
              <LeftSidebarHome />
            </div>
          </Col>
          <Col xs={12} md={8} lg={6}>
            <DetailCard itemId={id} itemType={type} />
          </Col>
          <Col xs={12} lg={3}>
            <div style={{ position: 'sticky', top: '76px' }}>
              <SidebarHome />
              <Container className="mt-4">
                <div
                  className="d-flex justify-content-around small px-5"
                  style={{ cursor: 'pointer' }}
                >
                  <p
                    className="small footer-link"
                    style={{ cursor: 'pointer', color: '#0a66c2' }}
                    onClick={() => {
                      setShowFooter(!showFooter)
                    }}
                  >
                    Informazioni
                  </p>
                  <p
                    style={{ cursor: 'pointer' }}
                    onClick={() => setShowFooter(!showFooter)}
                    className="small footer-link"
                  >
                    Altro
                  </p>
                </div>
                <div className="d-flex align-items-center px-2 small">
                  <img
                    src="/logo-linkedin-scritto.png"
                    width={65}
                    alt="LinkedIn Logo"
                  />
                  <p className="small mb-0">
                    Linkedin Corporation &copy; {new Date().getFullYear()}
                  </p>
                </div>
              </Container>
            </div>
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
