import { Card, Row, Col } from "react-bootstrap";
import { BiPencil, BiPlus } from "react-icons/bi";
import { FaGem } from "react-icons/fa";
import "../css/services.css";

const Experiences = () => {
  return (
    <Card className="border border-1 rounded-4 m-4 position-relative">
      <Card.Body className="border-bottom container">
        <Row>
          <Col xs={10}>
            <Card.Title>Esperienza</Card.Title>
          </Col>
          <Col xs={2} className="d-flex gap-2 justify-content-end">
            <BiPlus className="fs-3 edit me-3" />
            <BiPencil className="fs-3 edit" />
          </Col>
        </Row>
        <div className="d-flex mt-3">
          <div>
            <img
              src="https://content.wepik.com/statics/27196968/preview-page0.jpg"
              alt="Logo lavoro"
              className="job-logo rounded-circle mt-1"
            />
          </div>
          <div className="d-flex flex-column ms-2">
            <div className="mb-2">
              <p className="mb-0 fw-semibold">Apprendista manutentore</p>
              <p className="mb-0">Oropan SpA · Apprendistato</p>
              <p className="mb-0 opacity-50">
                apr 2024 - apr 2025 · 1 anno 1 mese
              </p>
              <p className="mb-0 opacity-50">
                Altamura, Puglia, Italia · In sede
              </p>
            </div>
            <p className="mb-0 fw-bold">
              <FaGem /> Problem solving e Manutenzione e riparazione
            </p>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Experiences;
