import { Card, Row, Col } from "react-bootstrap";
import { BiPencil, BiPlus } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Education = () => {
  const { id } = useParams();
  const { myProfile, otherProfile } = useSelector(
    (state) => state.saveProfileMe
  );

  const profileData = id ? otherProfile : myProfile;

  // Utilizzo dati dinamici basati sul profilo corrente
  const education = profileData
    ? [
        {
          id: 1,
          institution: profileData.area
            ? `Università degli Studi di ${profileData.area.split(",")[0]}`
            : "Università degli Studi di Padova",
          degree: profileData.title
            ? `Laurea in ${profileData.title.split(" ")[0]}`
            : "1° ciclo - Laurea L, Lettere/Studi umanistici",
          period: profileData.createdAt
            ? new Date(profileData.createdAt).getFullYear() -
              3 +
              " - " +
              new Date(profileData.createdAt).getFullYear()
            : "ott 2020 - dic 2023",
          logo: "https://seeklogo.com/images/U/universita-degli-studi-di-padova-logo-D71B2107E1-seeklogo.com.png",
        },
      ]
    : [];

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
        {education.length > 0 ? (
          education.map((edu) => (
            <div key={edu.id} className="d-flex mt-3">
              <div>
                <img
                  src={edu.logo}
                  alt="Logo università"
                  className="job-logo rounded-circle mt-1"
                />
              </div>
              <div className="d-flex flex-column ms-2">
                <div className="mb-2">
                  <p className="mb-0 fw-semibold">{edu.institution}</p>
                  <p className="mb-0">{edu.degree}</p>
                  <p className="mb-0 opacity-50">{edu.period}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="mt-3 text-muted">
            <p className="mb-0">Nessuna informazione educativa disponibile</p>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default Education;
