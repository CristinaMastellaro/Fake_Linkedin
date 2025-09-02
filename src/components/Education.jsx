import { Card, Row, Col } from "react-bootstrap";
import { BiPencil, BiPlus } from "react-icons/bi";

const Education = () => {
  return (
    <Card className="border border-1 rounded-4 m-4 position-relative">
      <Card.Body className="border-bottom container">
        <Row>
          <Col xs={10}>
            <Card.Title>Educazione</Card.Title>
          </Col>
          <Col xs={2} className="d-flex gap-2 justify-content-end">
            <BiPlus className="fs-3 me-3 edit" />
            <BiPencil className="fs-3 edit" />
          </Col>
        </Row>
        <div className="d-flex mt-3">
          <div>
            <img
              src="https://seeklogo.com/images/U/universita-degli-studi-di-padova-logo-D71B2107E1-seeklogo.com.png"
              alt="Logo lavoro"
              className="job-logo rounded-circle mt-1"
            />
          </div>
          <div className="d-flex flex-column ms-2">
            <div className="mb-2">
              <p className="mb-0 fw-semibold">
                Università degli Studi di Padova
              </p>
              <p className="mb-0">
                1° ciclo - Laurea L, Lettere/Studi umanistici
              </p>
              <p className="mb-0 opacity-50">ott 2020 - dic 2023 </p>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Education;
