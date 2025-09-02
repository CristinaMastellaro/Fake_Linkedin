import { Card, Row, Col } from "react-bootstrap";
import { BiPencil, BiRightArrowAlt } from "react-icons/bi";

const Services = () => {
  return (
    <Card className="border border-1 rounded-4 m-4 position-relative">
      <Card.Body className="border-bottom container">
        <Row>
          <Col xs={11}>
            <Card.Title>Servizi</Card.Title>
            <div className="mt-4 fw-semibold">
              <p className="fw-semibold my-3">
                Sviluppo Web · Sviluppo di database
              </p>
            </div>
          </Col>
          <Col xs={1}>
            <BiPencil className="fs-4 edit" />
          </Col>
        </Row>
      </Card.Body>
      <div className="fw-semibold d-flex align-items-center justify-content-center py-1 opacity-75">
        Mostra tutte le attività <BiRightArrowAlt className="ms-1" />
      </div>
    </Card>
  );
};

export default Services;
