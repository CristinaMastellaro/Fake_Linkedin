<<<<<<< HEAD
import './App.css'
import ConsigliatoPerTe from './components/ConsigliatoPerTe'
import Hero from './components/Hero'
import Analisi from './components/Analisi'
import 'bootstrap/dist/css/bootstrap.min.css'
import Attivita from './components/Attivita'
import Education from './components/Education'
import { useEffect } from 'react'
import Main from './components/Main'
import SidebarProfilo from './components/SidebarProfilo'
import { Container, Row, Col } from 'react-bootstrap'
=======
import CustomNavbar from "./components/Navbar";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import Main from "./components/Main";
import SidebarProfilo from "./components/SidebarProfilo";
import { Container, Row, Col } from "react-bootstrap";
import MiniHero from "./components/MiniHero";
>>>>>>> main

function App() {
  const [showMiniHero, setShow] = useState(false);

  useEffect(() => {
<<<<<<< HEAD
    fetch('https://striveschool-api.herokuapp.com/api/profile/me', {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGI1YTFkOTE2MjdjNjAwMTVmOGM1NmMiLCJpYXQiOjE3NTY3MzM5MTMsImV4cCI6MTc1Nzk0MzUxM30.SOLseepU4Ysb0KnFQYR3yWP1jikhGc89-HCynCKAhuY',
    })
  }, [])
=======
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
>>>>>>> main

  window.addEventListener("scroll", () => {
    const positionY = window.scrollY;
    console.log("positionY", positionY);
    if (positionY > 300) {
      setShow(true);
    } else {
      setShow(false);
    }
  });

  return (
    <Container>
      <div className="col-12 d-flex flex-column bg-light mb-5">
        <CustomNavbar />
      </div>
      {<MiniHero showMiniHero={showMiniHero} />}
      {/* <MiniHero /> */}
      <Row>
        <Col xs={12} lg={9}>
          <Main />
        </Col>
        <Col xs={12} lg={3}>
          <SidebarProfilo />
        </Col>
      </Row>
    </Container>
<<<<<<< HEAD
  )
}

export default App
=======

  );
}

export default App;
>>>>>>> main
