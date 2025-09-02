import { Card, Tab, Tabs, Row, Col } from "react-bootstrap";
import { BiRightArrowAlt, BiCheck } from "react-icons/bi";
import "../css/interests.css";

const Interests = () => {
  return (
    <Card className="border border-1 rounded-4 m-4 position-relative">
      <Card.Body className="border-bottom container">
        <Card.Title>Interessi</Card.Title>
        <div className="mt-4">
          <Tabs
            defaultActiveKey="aziende"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab className="tab-button" eventKey="aziende" title="Aziende">
              <Row>
                <Col className="d-flex">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png"
                    alt="Logo"
                    className="logo-uni me-2 mt-1"
                  />
                  <div>
                    <p className="mb-0 fw-semibold">Tesla</p>
                    <p className="mb-0">12.263.567 follower</p>
                    <div className="badge-info border-black py-1 opacity-75 d-flex align-items-center mt-3">
                      <BiCheck className="me-1 fs-4" /> Già segui
                    </div>
                  </div>
                </Col>
              </Row>
            </Tab>
            <Tab
              className="tab-button"
              eventKey="education"
              title="Scuole o università"
            >
              <Col className="d-flex">
                <img
                  src="https://seeklogo.com/images/U/universita-degli-studi-di-padova-logo-D71B2107E1-seeklogo.com.png"
                  alt="Logo"
                  className="logo-uni me-2 mt-1"
                />
                <div>
                  <p className="mb-0 fw-semibold">
                    Università degli Studi di Padova
                  </p>
                  <p className="mb-0">307.282 follower</p>
                  <div className="badge-info border-black py-1 opacity-75 d-flex align-items-center mt-3">
                    <BiCheck className="me-1 fs-4" /> Aggiungi foto
                  </div>
                </div>
              </Col>
            </Tab>
            <Tab className="tab-button" eventKey="gruppi" title="Gruppi">
              <Col className="d-flex">
                <img
                  src="https://logos-world.net/wp-content/uploads/2023/02/JavaScript-Emblem.png"
                  alt="Logo"
                  className="logo-uni me-2 mt-1"
                />
                <div>
                  <p className="mb-0 fw-semibold">JavaScript</p>
                  <p className="mb-0">1.495.258 utenti</p>
                  <div className="badge-info border-black py-1 opacity-75 d-flex align-items-center mt-3">
                    <BiCheck className="me-1 fs-4" /> Già iscritto
                  </div>
                </div>
              </Col>
            </Tab>
          </Tabs>
        </div>
      </Card.Body>
      <div className="fw-semibold d-flex align-items-center justify-content-center py-1 opacity-75">
        Mostra tutte le aziende
        <BiRightArrowAlt className="ms-1" />
      </div>
    </Card>
  );
};

export default Interests;
