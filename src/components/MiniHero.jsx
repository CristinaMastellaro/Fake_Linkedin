import { Container, Row, Col } from "react-bootstrap";
import "../css/hero.css";

const MiniHero = ({ showMiniHero }) => {
  return (
    <Container
      fluid
      className={
        showMiniHero
          ? "position-fixed end-0 start-0 z-2 bg-light px-4 py-2 mini-hero"
          : "position-fixed end-0 start-0 z-2 bg-light px-4 py-2 mini-hero-out"
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
              <p className="mb-0 fw-semibold small">Nome Cognome</p>
              <p className="small mb-0">Studente presso Epicode</p>
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
