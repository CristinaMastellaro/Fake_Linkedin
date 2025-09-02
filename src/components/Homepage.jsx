import { Container, Row, Col, Collapse, Card } from 'react-bootstrap';
import HomeMain from './HomeMain';
import SidebarHome from './SidebarHome';
import LeftSidebarHome from './LeftSidebarHome';
import { useState } from 'react';
import '../css/homePage.css';
import MyFooter from './MyFooter';

const Homepage = () => {
  const [showFooter, setShowFooter] = useState(false);
  console.log(showFooter);

  return (
    <>
      <Container className='homepage bg-light min-vh-100 py-4'>
        <Row className='justify-content-center'>
          <Col xs={12} md={4} lg={3}>
            <div className='position-fixed'>
              <LeftSidebarHome />
            </div>
          </Col>
          <Col xs={12} md={8} lg={6}>
            <HomeMain />
          </Col>
          <Col xs={12} lg={3}>
            <SidebarHome />
            <Container
              className='mt-4'
              style={{ position: 'sticky', top: '384px', zIndex: 2 }}
            >
              <div className='d-flex justify-content-around small'>
                <p>Informazioni</p>
                <span
                  style={{ cursor: 'pointer' }}
                  onClick={() => setShowFooter(!showFooter)}
                >
                  Altro
                </span>
              </div>
              <div className='d-flex align-items-center'>
                <img
                  src='/logo-linkedin-scritto.png'
                  width={70}
                  alt='LinkedIn Logo'
                />
                <p className='small mb-0 ms-2'>
                  Linkedin Corporation &copy; {new Date().getFullYear()}
                </p>
              </div>
            </Container>
          </Col>
        </Row>
      </Container>
      {showFooter && <div className='overlay-footer' />}
      <Collapse in={showFooter}>
        <div className='footer-dropup'>
          <div className='d-flex justify-content-end'>
            <button
              className='close-button fs-1'
              title='Chiudi'
              onClick={() => setShowFooter(false)}
            >
              &times;
            </button>
          </div>
          <MyFooter />
        </div>
      </Collapse>
    </>
  );
};

export default Homepage;
