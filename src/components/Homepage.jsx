import { Container, Row, Col, Collapse } from 'react-bootstrap';
import HomeMain from './HomeMain';
import SidebarHome from './SidebarHome';
import LeftSidebarHome from './LeftSidebarHome';
import { useState, useEffect, useRef } from 'react';
import '../css/FooterHome.css';
import MyFooter from './MyFooter';

const Homepage = () => {
  const [showFooter, setShowFooter] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        showForm &&
        footerRef.current &&
        !footerRef.current.contains(event.target)
      ) {
        setShowForm(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showForm]);

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
              <div
                className='d-flex justify-content-around small px-5'
                style={{ cursor: 'pointer' }}
              >
                <p
                  className='small footer-link'
                  style={{ cursor: 'pointer', color: '#0a66c2' }}
                  onClick={() => {
                    setShowForm(!showFooter);
                  }}
                >
                  Informazioni
                </p>
                <span
                  style={{ cursor: 'pointer' }}
                  onClick={() => setShowFooter(!showFooter)}
                  className='small footer-link'
                >
                  Altro
                </span>
              </div>
              <div className='d-flex align-items-center px-2 small'>
                <img
                  src='/logo-linkedin-scritto.png'
                  width={65}
                  alt='LinkedIn Logo'
                />
                <p className='small mb-0'>
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
