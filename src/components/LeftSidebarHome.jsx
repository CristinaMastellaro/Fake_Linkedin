import { Card } from "react-bootstrap";
import "../css/leftSidebarHome.css";
import { BiSolidBookmark, BiNews, BiCalendar, BiPlus } from "react-icons/bi";
import { FaPeopleGroup } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const LeftSidebarHome = () => {
  const myInfo = useSelector((state) => {
    return state.saveProfileMe.myProfile;
  });

  return (
    <>
      <section className="section-sidebar-top position-relative p-0 shadow">
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
          <div className="bg-secondary-subtle p-1 rounded-2 mt-3">
            <div className="small d-flex align-items-center justify-content-start py-1 experiences-side ps-2">
              <BiPlus className="fs-5 me-1" />
              Esperienze
            </div>
          </div>
        </div>
      </section>
      <section className="section-sidebar d-flex justify-content-between connections shadow">
        <div>
          <p className="mb-2 fw-semibold">Collegamenti</p>
          <p className="mb-0 fw-semibold opacity-75">Espandi la tua rete</p>
        </div>
        <p className="mb-0 myBlue">3</p>
      </section>
      <section className="section-sidebar shadow">
        <p className="mb-2 opacity-75">
          Sblocca strumenti e informazioni Premium
        </p>
        <p className="mb-0 fw-semibold premium-trial">
          <span className="orange-square"></span>
          Prova Premium per 0 EUR
        </p>
      </section>
      <section className="section-sidebar shadow">
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
