import { Container, Row, Col } from "react-bootstrap";
import Hero from "./Hero";
import ConsigliatoPerTe from "./ConsigliatoPerTe";
import Attivita from "./Attivita";
import Analisi from "./Analisi";
import Education from "./Education";
import Info from "./Info";
import Experiencies from "./Experiencies";
import Services from "./Services";
import Interests from "./Interests";
import { useState } from "react";
import MiniHero from "./MiniHero";

const Main = () => {
  const [showMiniHero, setShow] = useState(false);
  console.log("Weiii");

  return (
    <section
      onScroll={(e) => {
        const positionY = e.target;
        console.log("positionY", positionY);

        if (positionY > 500) {
          setShow(true);
        } else {
          setShow(false);
        }
      }}
    >
      {showMiniHero ? <MiniHero /> : ""}
      <Hero />
      <ConsigliatoPerTe />
      <Analisi />
      <Info />
      {/* Informazioni > c'è so */}
      {/* Servizi */}
      <Services />
      <Attivita />
      <Experiencies />
      {/* Esperienza */}
      <Education />
      <Interests />
    </section>
  );
};

export default Main;
