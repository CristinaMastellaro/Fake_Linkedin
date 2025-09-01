import { Col, Container, Row } from 'react-bootstrap';

function FooterHome() {
  return (
    <>
      <Container className='text-center mt-4'>
        <Row className='mb-2'>
          <Col>
            <span className='footer-link'>Informazioni</span>
          </Col>
          <Col>
            <span className='footer-link'>Accessibilità</span>
          </Col>
        </Row>
        <Row className='mb-2'>
          <Col>
            <span className='footer-link'>Centro assistenza</span>
          </Col>
        </Row>
        <Row className='mb-2'>
          <Col>
            <span className='footer-link'>Privacy e condizioni</span>
          </Col>
        </Row>
        <Row className='mb-2'>
          <Col>
            <span className='footer-link'>
              Opzioni per gli annunci pubblicitari
            </span>
          </Col>
        </Row>
        <Row className='mb-2'>
          <Col>
            <span className='footer-link'>Pubblicità</span>
          </Col>
          <Col>
            <span className='footer-link'>Servizi alle aziende</span>
          </Col>
        </Row>
        <Row className='mb-2'>
          <Col>
            <span className='footer-link'>Scarica l’app LinkedIn</span>
          </Col>
          <Col>
            <span className='footer-link'>Altro</span>
          </Col>
        </Row>
        <Row className='mt-3'>
          <Col>
            <span style={{ color: '#0a66c2', fontWeight: 'bold' }}>Linked</span>
            <i
              class='bi bi-linkedin'
              style={{ color: '#0a66c2', fontWeight: 'bold' }}
            ></i>
            &nbsp;LinkedIn Corporation &copy; {new Date().getFullYear()}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default FooterHome;
