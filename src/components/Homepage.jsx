import { Container, Row, Col } from 'react-bootstrap'
import HomeMain from './HomeMain'
import SidebarHome from './SidebarHome'

const Homepage = () => {
  return (
    <Container className="homepage bg-light min-vh-100 py-4">
      <Row className="justify-content-center">
        <Col xs={12} lg={6}>
          <HomeMain />
        </Col>
        <Col xs={12} lg={3}>
          <SidebarHome />
        </Col>
      </Row>
    </Container>
  )
}

export default Homepage
