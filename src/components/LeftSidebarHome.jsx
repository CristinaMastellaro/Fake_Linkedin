import { Alert, Card, Modal } from "react-bootstrap";
import "../css/leftSidebarHome.css";
import { BiSolidBookmark, BiNews, BiCalendar, BiPlus } from "react-icons/bi";
import { FaPeopleGroup } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import ExperienceForm from "./ExperienceForm";

const LeftSidebarHome = () => {
  const myInfo = useSelector((state) => {
    return state.saveProfileMe.myProfile;
  });

  const [showModal, setShowModal] = useState(false);
  const [alert, setAlert] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setAlert(true);
    console.log("alert", alert);
    setTimeout(() => setAlert(false), "10000");
  };

  return (
    <>
      <section className="section-sidebar-top position-relative p-0 shadow-sm">
        <img
          src="https://png.pngtree.com/background/20230408/original/pngtree-mountain-view-in-the-morning-picture-image_2336856.jpg"
          className="side-img"
        />
        {myInfo && myInfo.image ? (
          <img
            src={myInfo.image}
            alt="Profile picture"
            className="picture-profile-side"
          />
        ) : (
          <img
            src="https://avatar.iran.liara.run/public"
            alt="Profile picture"
            className="picture-profile-side"
          />
        )}
        <div style={{ padding: "1em" }}>
          <Link
            to="/profile"
            className="fs-5 text-dark text-decoration-none fw-semibold"
          >
            {myInfo && myInfo.name + " " + myInfo.surname}
          </Link>
          <Card.Text className="mb-0 mt-2">{myInfo && myInfo.title}</Card.Text>
          <div className="d-flex gap-1 my-1 flex-wrap">
            <p className="my-0 opacity-75 small">{myInfo && myInfo.area}</p>
          </div>
          <div
            className="bg-secondary-subtle p-1 rounded-2 mt-3"
            onClick={handleShowModal}
          >
            <div className="small d-flex align-items-center justify-content-start py-1 experiences-side ps-2">
              <BiPlus className="fs-5 me-1" />
              Esperienze
            </div>
          </div>
          {alert && (
            <Alert variant="success" className="py-1 mt-2 mb-0">
              Esperienza salvata!
            </Alert>
          )}
        </div>
      </section>
      <section className="section-sidebar d-flex justify-content-between connections shadow-sm">
        <div>
          <p className="mb-2 fw-semibold">Collegamenti</p>
          <p className="mb-0 fw-semibold opacity-75">Espandi la tua rete</p>
        </div>
        <p className="mb-0 myBlue">3</p>
      </section>
      <section className="section-sidebar shadow-sm">
        <p className="mb-2 opacity-75">
          Sblocca strumenti e informazioni Premium
        </p>
        <p className="mb-0 fw-semibold premium-trial">
          <span className="orange-square"></span>
          Prova Premium per 0 EUR
        </p>
      </section>
      <section className="section-sidebar shadow-sm">
        <div className="d-flex fw-semibold align-items-center hover-underlined mb-2">
          <BiSolidBookmark className="me-1" />
          Elementi salvati
        </div>
        <div className="d-flex fw-semibold align-items-center hover-underlined mb-2">
          <FaPeopleGroup className="me-1" />
          Gruppi
        </div>
        <div className="d-flex fw-semibold align-items-center hover-underlined mb-2">
          <BiNews className="me-1" />
          Newsletter
        </div>
        <div className="d-flex fw-semibold align-items-center hover-underlined">
          <BiCalendar className="me-1" />
          Eventi
        </div>
      </section>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Aggiungi Esperienza</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ExperienceForm
            handleCloseModal={handleCloseModal}
            userId={myInfo._id}
            experience={""}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LeftSidebarHome;
