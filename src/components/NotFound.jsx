import { Container, Row, Col } from 'react-bootstrap'

import '../css/NotFoundPage.css'
import { Link } from 'react-router-dom'

const Complete404Page = () => {
  return (
    <div className="page-container">
      <div className="main-content">
        <div className="error-card">
          <div className="error-text-container">
            <h1 className="error-title">Pagina non trovata</h1>
            <p className="error-message">
              Non abbiamo trovato la pagina che stai cercando. Prova a tornare
              alla pagina precedente o visita il nostro{' '}
              <a href="#" className="help-link">
                Centro assistenza
              </a>{' '}
              per saperne di più.
            </p>
            <a href="/" className="home-button-link">
              <button className="home-button">Vai al tuo feed</button>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-container">
        <div className="image-container position-relative">
          <img
            src="/giphy-unscreen.gif"
            alt="Telescopio animato"
            className="error-image"
          />
        </div>
        <Container fluid className="py-3">
          <Row className="justify-content-center align-items-center flex-wrap">
            <Col
              xs="auto"
              className="d-flex align-items-center me-3 mb-2 mb-md-0"
            >
              <Link to="/">
                <img
                  src="/logo-linkedin-scritto.png"
                  alt="LinkedIn Logo"
                  height="14"
                  style={{ width: 120, height: 50 }}
                  className="me-2"
                />
              </Link>

              <span className="text-muted small">© 2025</span>
            </Col>
            <Col xs="auto">
              <ul className="list-inline mb-0 flex-wrap justify-content-center d-flex">
                <li className="list-inline-item text-muted small px-2">
                  <a href="#license" className="footer-link">
                    Contratto d'licenza
                  </a>
                </li>
                <li className="list-inline-item text-muted small px-2">
                  <a href="#privacy" className="footer-link">
                    Informativa sulla privacy
                  </a>
                </li>
                <li className="list-inline-item text-muted small px-2">
                  <a href="#community-guidelines" className="footer-link">
                    Linee guida della community
                  </a>
                </li>
                <li className="list-inline-item text-muted small px-2">
                  <a href="#cookie-policy" className="footer-link">
                    Informativa sui cookie
                  </a>
                </li>
                <li className="list-inline-item text-muted small px-2">
                  <a href="#copyright" className="footer-link">
                    Informativa sul copyright
                  </a>
                </li>
                <li className="list-inline-item text-muted small px-2">
                  <a href="#controls" className="footer-link">
                    Controlli e regole
                  </a>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default Complete404Page
