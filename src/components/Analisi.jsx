import { Card } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { BiLineChart, BiRightArrowAlt } from "react-icons/bi";

const Analisi = () => {
  return (
    <Card className="border border-1 rounded-4 m-4 position-relative">
      <Card.Body className="border-bottom">
        <Card.Title>Analisi</Card.Title>
        <Card.Text className="d-flex align-items-center gap-1 opacity-75">
          <FaEye />
          Solo per te
        </Card.Text>
        <div className="d-flex align-items-start gap-2">
          <FaPeopleGroup className="mt-1" />
          <div>
            <p className="mb-0 fw-semibold">3 visualizzazioni del profilo</p>
            <p className="mb-0">Scopri chi ha visistato il tuo profilo.</p>
          </div>
        </div>
        <div className="d-flex gap-2 mt-3">
          <BiLineChart className="mt-1" />
          <div>
            <p className="mb-0 fw-semibold">0 impressioni del post</p>
            <p className="mb-0">Crea un post per aumentare l'interesse.</p>
            <p className="mb-0 opacity-50">Ultimi 7 giorni</p>
          </div>
        </div>
      </Card.Body>
      <div className="fw-semibold d-flex align-items-center justify-content-center py-1 opacity-75">
        Mostra tutte le analisi <BiRightArrowAlt className="ms-1" />
      </div>
    </Card>
  );
};

export default Analisi;
