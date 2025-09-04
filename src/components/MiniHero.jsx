import { Container, Row, Col } from "react-bootstrap";
import "../css/hero.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const MiniHero = () => {
  const { id } = useParams();
  const [showMiniHero, setShow] = useState("");

  const myInfo = useSelector((state) => state.saveProfileMe?.myProfile);
  const otherInfo = useSelector((state) => state.saveProfileOther?.otherProfile);

  const isOwner = !id || (myInfo && id === myInfo._id);

  const profile = isOwner
    ? myInfo || { name: "Caricamento...", surname: "", title: "", image: "" }
    : otherInfo || { name: "Caricamento...", surname: "", title: "", image: "" };

  useEffect(() => {
    const handleScroll = () => {
      const positionY = window.scrollY;
      if (positionY === 0) setShow("");
      else if (positionY > 300) setShow("mini-hero");
      else setShow("mini-hero-out");
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Container
      fluid
      className={
        "position-fixed end-0 start-0 z-2 bg-light py-2 d-none d-lg-block start-mini-hero " +
        showMiniHero
      }
    >
      <Row className="align-items-center">
        {/* Sinistra */}
        <Col xs={5}>
          <div className="d-flex gap-1">
            <img
              src={profile.image || "/profile-icon.png"}
              alt="Profile"
              style={{ height: "25px", width: "25px" }}
              className="mt-1 me-1 rounded-circle"
            />
            <div>
              <p className="mb-0 fw-semibold small">
                {profile.name} {profile.surname}
              </p>
              <p className="small mb-0">{profile.title}</p>
            </div>
          </div>
        </Col>

        {/* Destra */}
        <Col xs={7} className="d-flex justify-content-end">
          <div className="d-flex flex-nowrap gap-2 align-items-center">
            {isOwner ? (
              <>
                <div className="badge-info border-black small px-1">Risorse</div>
                <div className="badge-info myBlue small px-1">
                  Aggiungi sezione del profilo
                </div>
                <div className="badge-info badge-active small px-1">
                  Disponibile per
                </div>
              </>
            ) : (
              <>
                <div className="badge-info border-black small px-1">Segui</div>
                <div className="badge-info myBlue small px-1">Messaggio</div>
              </>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MiniHero;
