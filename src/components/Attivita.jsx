import { Card } from "react-bootstrap";
import { BiRightArrowAlt } from "react-icons/bi";
import "../css/hero.css";

const Attivita = () => {
  return (
    <Card className="border border-1 rounded-4 m-4 position-relative">
      <Card.Body className="border-bottom">
        <Card.Title>Attività</Card.Title>
        <Card.Text className="d-flex align-items-center gap-1 opacity-75 myBlue">
          3 follower
        </Card.Text>
        <div className="badge-info myBlue py-1">Crea un post</div>
        <div className="mt-4">
          <p className="mb-0 fw-bold">Non hai ancora pubblicato nulla</p>
          <p className="mb-0 small">I post che condividi appariranno qui</p>
        </div>
      </Card.Body>
      <div className="fw-semibold d-flex align-items-center justify-content-center py-1 opacity-75">
        Mostra tutte le attività <BiRightArrowAlt className="ms-1" />
      </div>
    </Card>
  );
};

export default Attivita;
