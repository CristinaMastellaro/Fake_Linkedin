import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <Container style={{ minHeight: '84.8vh' }} className="d-flex align-items-center justify-content-center">
      <Row className="justify-content-center mt-3">
        <Col className="text-center">
          <h3>404 - Not Found</h3>
          <Link to="/">
            <p>Torna in Home</p>
          </Link>
        </Col>
      </Row>
    </Container>
  )
}

export default NotFound