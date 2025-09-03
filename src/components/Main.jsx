import Hero from "./Hero";
import ConsigliatoPerTe from "./ConsigliatoPerTe";
import Attivita from "./Attivita";
import Analisi from "./Analisi";
import Education from "./Education";
import Info from "./Info";
import Experiencies from "./Experiencies";
import Services from "./Services";
import Interests from "./Interests";

const Main = () => {
  return (
    <section>
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
