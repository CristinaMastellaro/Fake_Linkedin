import { Card, Carousel, Row, Col } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import "../css/consigliatoPerTe.css";
import Photo from "../assets/img/Camera_Linkedin.png";
import Picture from "../assets/img/Settore-Linkedin.png";
import Badge from "../assets/img/Badge-Linkedin.png";

const ConsigliatoPerTe = () => {
  return (
    <Card className="border border-1 rounded-4 m-4 position-relative">
      <Card.Body>
        <Card.Title>Consigliato per te</Card.Title>
        <Card.Text className="d-flex align-items-center gap-1 opacity-75">
          <FaEye />
          Solo per te
        </Card.Text>
        <div className="container-fluid">
          <Row className="gap-1 d-none d-md-flex">
            <Col className="border p-3 rounded-3 border-opacity-25 d-flex flex-column">
              <div className="d-flex gap-2 align-items-center mb-2">
                <img src={Photo} alt="Fotocamera" className="img-consigliato" />

                <span className="fw-semibold text-start">
                  Aggiungi una foto al tuo profilo per aiutare gli altri a
                  riconoscerti
                </span>
              </div>
              <p className="small flex-grow-1">
                Gli utenti con una foto del profilo ricevono fino a 2,3 volte
                più visualizzazioni del profilo.
              </p>
              <div className="badge-info border-black py-1 opacity-75">
                Aggiungi foto
              </div>
            </Col>
            <Col className="border p-3 rounded-3 border-opacity-25 d-flex flex-column">
              <div className="d-flex gap-2 align-items-center mb-2">
                <img
                  src={Picture}
                  alt="Fotocamera"
                  className="img-consigliato"
                />
                <span className="fw-semibold text-start">
                  In quale settore lavori?
                </span>
              </div>
              <p className="small flex-grow-1">
                Gli utenti con una foto del profilo ricevono fino a 2,5 volte
                più visualizzazioni del profilo.
              </p>
              <div className="badge-info border-black py-1 opacity-75">
                Aggiungi settore
              </div>
            </Col>
            <Col className="border p-3 rounded-3 border-opacity-25">
              <div className="d-flex gap-2 align-items-center mb-2">
                <img src={Badge} alt="Fotocamera" className="img-consigliato" />

                <span className="fw-semibold text-start">
                  Scrivi un riepilogo per mettere in evidenza la tua personalità
                  o la tua esperienza lavorativa
                </span>
              </div>
              <p className="small">
                Gli utenti con una foto del profilo ricevono fino a 3,9 volte
                più visualizzazioni del profilo.
              </p>
              <div className="badge-info border-black py-1 opacity-75">
                Aggiungi un riepilogo
              </div>
            </Col>
          </Row>
        </div>
      </Card.Body>
      <Carousel data-bs-theme="dark" className="d-md-none">
        <Carousel.Item interval={120000}>
          <img
            className="d-block w-100 carousel-img"
            src="https://t3.ftcdn.net/jpg/03/53/11/00/360_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg"
            alt="First slide"
          />
          <Carousel.Caption className="container border p-3 rounded-3 border-opacity-25">
            <div className="d-flex gap-2 align-items-center mb-2">
              <img src={Photo} alt="Fotocamera" className="img-consigliato" />

              <span className="fw-semibold text-start">
                Aggiungi una foto al tuo profilo per aiutare gli altri a
                riconoscerti
              </span>
            </div>
            <p className="small">
              Gli utenti con una foto del profilo ricevono fino a 2,3 volte più
              visualizzazioni del profilo.
            </p>
            <div className="badge-info border-black py-1 opacity-75">
              Aggiungi foto
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={120000}>
          <img
            className="d-block w-100 carousel-img"
            src={Picture}
            alt="Second slide"
          />
          <Carousel.Caption className="container border p-3 rounded-3 border-opacity-25">
            <div className="d-flex gap-2 align-items-center mb-2">
              <img src={Picture} alt="Fotocamera" className="img-consigliato" />
              <span className="fw-semibold text-start">
                In quale settore lavori?
              </span>
            </div>
            <p className="small">
              Gli utenti con una foto del profilo ricevono fino a 2,5 volte più
              visualizzazioni del profilo.
            </p>
            <div className="badge-info border-black py-1 opacity-75">
              Aggiungi settore
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={120000}>
          <img
            className="d-block w-100 carousel-img "
            src="https://t3.ftcdn.net/jpg/03/53/11/00/360_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg"
            alt="Third slide"
          />
          <Carousel.Caption className="container border p-3 rounded-3 border-opacity-25">
            <div className="d-flex gap-2 align-items-center mb-2">
              <img src={Badge} alt="Fotocamera" className="img-consigliato" />

              <span className="fw-semibold text-start">
                Scrivi un riepilogo per mettere in evidenza la tua personalità o
                la tua esperienza lavorativa
              </span>
            </div>
            <p className="small">
              Gli utenti con una foto del profilo ricevono fino a 3,9 volte più
              visualizzazioni del profilo.
            </p>
            <div className="badge-info border-black py-1 opacity-75">
              Aggiungi un riepilogo
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Card>
  );
};

export default ConsigliatoPerTe;
