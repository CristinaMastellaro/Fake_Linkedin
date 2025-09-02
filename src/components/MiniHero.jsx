import { Container, Row, Col } from "react-bootstrap";
import "../css/hero.css";
import { useSelector } from "react-redux";
import { useState } from "react";

const MiniHero = () => {
  const [showMiniHero, setShow] = useState("");
  const myInfo = useSelector((state) => {
    console.log("state", state.saveProfileMe.myProfile);
    return state.saveProfileMe.myProfile;
  });

  window.addEventListener("scroll", () => {
    const positionY = window.scrollY;
    if (positionY === 0) {
      setShow("");
    } else if (positionY > 300) {
      setShow("mini-hero");
    } else {
      setShow("mini-hero-out");
    }
  });

  return (
    <Container
      fluid
      className={
        "position-fixed end-0 start-0 z-2 bg-light px-4 py-2 d-none d-lg-block start-mini-hero " +
        showMiniHero
      }
    >
      <Row className="align-items-center">
        <Col xs={5}>
          <div className="d-flex gap-1">
            <img
              src="https://png.pngtree.com/background/20230408/original/pngtree-mountain-view-in-the-morning-picture-image_2336856.jpg"
              alt="Profile picture"
              style={{ height: "25px", width: "25px" }}
              className="mt-1 me-1 rounded-circle"
            />
            <div>
              <p className="mb-0 fw-semibold small">
                {myInfo && myInfo.name + " " + myInfo.surname}
              </p>
              <p className="small mb-0">{myInfo && myInfo.title}</p>
            </div>
          </div>
        </Col>
        <Col xs={7} className="d-flex justify-content-end ">
          <div className="d-flex flex-nowrap gap-2 align-items-center">
            <div className="badge-info border-black small px-1">Risorse</div>
            <div className="badge-info myBlue small px-1">
              Aggiungi sezione del profilo
            </div>
            <div className="badge-info badge-active small px-1">
              Disponibile per
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MiniHero;
