import { Container, Row, Col, Collapse } from "react-bootstrap";
import HomeMain from "../components/HomeMain";
import SidebarHome from "../components/SidebarHome";
import LeftSidebarHome from "../components/LeftSidebarHome";
import { useState, useEffect, useRef } from "react";
import "../css/FooterHome.css";
import MyFooter from "../components/MyFooter";

const Homepage = () => {
  const [showForm, setShowForm] = useState(false);
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

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showForm]);

  return (
    <>
      <Container className="homepage bg-light min-vh-100 py-4">
        <Row className="justify-content-center">
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
                style={{ cursor: "pointer", color: "#0a66c2" }}
                onClick={() => {
                  setShowForm(!showForm);
                }}
              >
                Altro
              </p>
            </Container>
          </Col>
        </Row>
      </Container>

      <Collapse in={showForm}>
        <div className="footer-dropup" ref={footerRef}>
          <MyFooter onClose={() => setShowForm(false)} />
        </div>
      </Collapse>
    </>
  );
};

export default Homepage;
