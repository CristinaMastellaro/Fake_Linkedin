import { Container, Row, Col } from "react-bootstrap";
import Hero from "./Hero";
import ConsigliatoPerTe from "./ConsigliatoPerTe";
import Attivita from "./Attivita";
import Analisi from "./Analisi";
import Education from "./Education";

const Main = () => {
  return (
    <section>
      <Hero />
      <ConsigliatoPerTe />
      <Analisi />
      <Attivita />
      <Education />
    </section>
  );
};

export default Main;
