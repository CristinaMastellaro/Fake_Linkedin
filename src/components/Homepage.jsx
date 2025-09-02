import { Container, Row, Col, Collapse } from 'react-bootstrap';
import HomeMain from './HomeMain';
import SidebarHome from './SidebarHome';
import LeftSidebarHome from './LeftSidebarHome';
import { useState } from 'react';
import '../css/FooterHome.css';
import MyFooter from './MyFooter';

const Homepage = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Container className='homepage bg-light min-vh-100 py-4'>
        <Row className='justify-content-center'>
          <Col xs={12} md={4} lg={3}>
            <LeftSidebarHome />
          </Col>
          <Col xs={12} md={8} lg={6}>
            <HomeMain />
          </Col>
          <Col xs={12} lg={3}>
            <SidebarHome />
            <Container>
              <p>Informazioni</p>
              <p
                style={{ cursor: 'pointer', color: '#0a66c2' }}
                onClick={() => setShowForm(!showForm)}
              >
                Altro
              </p>
            </Container>
          </Col>
        </Row>
      </Container>
      <Collapse in={showForm}>
        <div className='footer-dropup'>
          <MyFooter />
        </div>
      </Collapse>
    </>
  );
};

export default Homepage;
