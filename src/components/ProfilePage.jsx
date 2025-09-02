import { useEffect, useState } from "react";
import Main from "../components/Main";
import SidebarProfilo from "../components/SidebarProfilo";
import { Row, Col } from "react-bootstrap";
import MiniHero from "../components/MiniHero";
import FooterProfile from "../components/Footer/FooterProfile";

const ProfilePage = () => {
  const [showMiniHero, setShow] = useState(false);

  useEffect(() => {
    fetch("https://striveschool-api.herokuapp.com/api/profile/me", {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGI1YTFkOTE2MjdjNjAwMTVmOGM1NmMiLCJpYXQiOjE3NTY3MzM5MTMsImV4cCI6MTc1Nzk0MzUxM30.SOLseepU4Ysb0KnFQYR3yWP1jikhGc89-HCynCKAhuY",
      },
    })
      .then((data) => {
        if (data.ok) {
          return data.json();
        } else {
          throw new Error("Erroreeee");
        }
      })
      .then((data) => {
        console.log("data", data);
      });
  }, []);

  window.addEventListener("scroll", () => {
    const positionY = window.scrollY;
    if (positionY > 300) {
      setShow(true);
    } else {
      setShow(false);
    }
  });

  return (
    <>
      {<MiniHero showMiniHero={showMiniHero} />}
      <Row>
        <Col xs={12} lg={9}>
          <Main />
        </Col>
        <Col xs={12} lg={3}>
          <SidebarProfilo />
        </Col>
      </Row>
      <FooterProfile />
    </>
  );
};

export default ProfilePage;
