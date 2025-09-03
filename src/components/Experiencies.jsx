import { Card, Row, Col } from "react-bootstrap";
import { BiPencil, BiPlus } from "react-icons/bi";
import { FaGem } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "../css/services.css";

const Experiences = () => {
  const { id } = useParams();
  const { myProfile, otherProfile } = useSelector(
    (state) => state.saveProfileMe
  );

  const profileData = id ? otherProfile : myProfile;

  // Utilizzo dati dinamici basati sul profilo corrente
  const experiences = profileData
    ? [
        {
          id: 1,
          position: profileData.title
            ? profileData.title
            : "Apprendista manutentore",
          company: profileData.area
            ? `Azienda di ${profileData.area.split(",")[0]}`
            : "Oropan SpA",
          type: "Apprendistato",
          period: profileData.createdAt
            ? new Date(profileData.createdAt).getFullYear() + " - Presente"
            : "apr 2024 - Presente",
          location: profileData.area || "Altamura, Puglia, Italia",
          skills: profileData.bio
            ? profileData.bio.split(" ").slice(0, 3).join(" ")
            : "Problem solving e Manutenzione",
          logo: "https://content.wepik.com/statics/27196968/preview-page0.jpg",
        },
      ]
    : [];

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
        {experiences.length > 0 ? (
          experiences.map((exp) => (
            <div key={exp.id} className="d-flex mt-3">
              <div>
                <img
                  src={exp.logo}
                  alt="Logo lavoro"
                  className="job-logo rounded-circle mt-1"
                />
              </div>
              <div className="d-flex flex-column ms-2">
                <div className="mb-2">
                  <p className="mb-0 fw-semibold">{exp.position}</p>
                  <p className="mb-0">
                    {exp.company} · {exp.type}
                  </p>
                  <p className="mb-0 opacity-50">{exp.period}</p>
                  <p className="mb-0 opacity-50">{exp.location}</p>
                </div>
                <p className="mb-0 fw-bold">
                  <FaGem /> {exp.skills}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="mt-3 text-muted">
            <p className="mb-0">Nessuna esperienza lavorativa disponibile</p>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default Experiences;
