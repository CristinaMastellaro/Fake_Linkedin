import { Container, Row, Col } from "react-bootstrap";
import LeftSidebarHome from "./LeftSidebarHome";
import Hero from "./Hero";

const Homepage = () => {
  return (
    <Container>
      <Row>
        <Col className="pt-5 mt-5 d-none d-lg-flex flex-column" md={2}>
          <LeftSidebarHome />
        </Col>
        <Col xs={8}>
          <Hero />
        </Col>
      </Row>
    </Container>
  );
};

export default Homepage;
