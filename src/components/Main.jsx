import Hero from "./Hero";
import ConsigliatoPerTe from "./ConsigliatoPerTe";
import Attivita from "./Attivita";
import Analisi from "./Analisi";
import Education from "./Education";
import Info from "./Info";
import Experiencies from "./Experiencies";
import Services from "./Services";
import Interests from "./Interests";

const Main = ({ userId, loggedUserId }) => {
  // Considera il tuo profilo come "me"
  const isOwner = userId === "me" || String(userId) === String(loggedUserId);

  console.log("Main.jsx debug:");
  console.log("userId (profilo visitato):", userId);
  console.log("loggedUserId (utente loggato):", loggedUserId);
  console.log("isOwner:", isOwner);

  return (
    <section>
      <Hero />
      {isOwner && <ConsigliatoPerTe />}
      {isOwner && <Analisi />}

      <Info />
      <Services isOwner={isOwner} />
      <Attivita isOwner={isOwner} />
      <Experiencies />
      <Education />
      <Interests />
    </section>
  );
};

export default Main;
