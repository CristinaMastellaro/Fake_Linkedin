import { Card } from "react-bootstrap";
import "../css/leftSidebarHome.css";
import { BiSolidBookmark, BiNews, BiCalendar } from "react-icons/bi";
import { FaPeopleGroup } from "react-icons/fa6";
import { Link } from "react-router-dom";

const LeftSidebarHome = () => {
  return (
    <>
      <section className="section-sidebar position-relative p-0">
        <img
          src="https://png.pngtree.com/background/20230408/original/pngtree-mountain-view-in-the-morning-picture-image_2336856.jpg"
          className="side-img"
        />
        <div className="picture-profile-side"></div>

        <div className="mt-4 p-2">
          <Link
            to="/profile"
            className="fs-5 text-dark text-decoration-none fw-semibold"
          >
            Nome Cognome
          </Link>

          <Card.Text className="mb-0">Lavoro description</Card.Text>

          <div className="d-flex gap-1 my-1 flex-wrap">
            <p className="my-0 opacity-75 small">Padova, Veneto, Italia</p>
          </div>

          {/* <Button variant="primary">Go somewhere</Button> */}
        </div>
      </section>
      <section className="section-sidebar d-flex justify-content-between connections">
        <div>
          <p className="mb-2 fw-semibold">Collegamenti</p>
          <p className="mb-0 fw-semibold opacity-75">Espandi la tua rete</p>
        </div>
        <p className="mb-0 myBlue">3</p>
      </section>
      <section className="section-sidebar">
        <p className="mb-2 opacity-75">
          Sblocca strumenti e informazioni Premium
        </p>
        <p className="mb-0 fw-semibold premium-trial">
          <span className="orange-square"></span>
          Prova Premium per 0 EUR
        </p>
      </section>
      <section className="section-sidebar">
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
    </>
  );
};

export default LeftSidebarHome;
