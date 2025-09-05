import { Container, Row, Col, Collapse } from 'react-bootstrap'
import HomeMain from './HomeMain'
import SidebarHome from './SidebarHome'
import LeftSidebarHome from './LeftSidebarHome'
import Messaggistica from './Messaggistica'
import { useState, useEffect, useRef } from 'react'
import '../css/footerHome.css'
import MyFooter from './MyFooter'

const Homepage = () => {
  const [showFooter, setShowFooter] = useState(false)
  const footerRef = useRef(null)

  useEffect(() => {
    // Reset dello scroll quando il componente viene montato
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 100)
  }, []) // Si attiva solo al mount del componente

  // Gestisce il click fuori dal footer per chiuderlo
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (footerRef.current && !footerRef.current.contains(event.target)) {
        setShowFooter(false)
      }
    }

    // Aggiunge l'event listener solo se il footer è visibile
    if (showFooter) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    // Rimuove l'event listener quando il componente viene smontato o il footer viene chiuso
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showFooter])

  return (
    <>
      <Container className="homepage bg-light min-vh-100 py-4">
        <Row className="justify-content-center">
          <Col xs={12} md={4} lg={3}>
            <div className="sticky-sidebar">
              <LeftSidebarHome />
            </div>
            <div className="d-block d-lg-none mt-3">
              <SidebarHome />
            </div>
          </Col>
          <Col xs={12} md={8} lg={6}>
            <HomeMain />
          </Col>
          <Col xs={12} lg={3}>
            <div className="d-none d-lg-block">
              <SidebarHome />
            </div>
            <Container
              className="mt-4"
              style={{ top: '429px', zIndex: 2 }}
            >
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
              <div className="d-flex align-items-center px-2 small justify-content-center">
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
          </Col>
        </Row>
      </Container>
      <Messaggistica />
      {showFooter && <div className="overlay-footer" />}
      <Collapse in={showFooter}>
        <div className="footer-dropup" ref={footerRef}>
          <MyFooter />
          <div className="position-absolute top-0 end-0 me-5 pe-1">
            <button
              className="close-button fs-1"
              title="Chiudi"
              onClick={() => setShowFooter(false)}
            >
              &times;
            </button>
          </div>
        </div>
      </Collapse>
    </>
  )
}

export default Homepage
