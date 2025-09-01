import "./App.css";
import ConsigliatoPerTe from "./components/ConsigliatoPerTe";
import Hero from "./components/Hero";
import Analisi from "./components/Analisi";
import "bootstrap/dist/css/bootstrap.min.css";
import Attivita from "./components/Attivita";
import Education from "./components/Education";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    fetch("https://striveschool-api.herokuapp.com/api/profile/me", {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGI1YTFkOTE2MjdjNjAwMTVmOGM1NmMiLCJpYXQiOjE3NTY3MzM5MTMsImV4cCI6MTc1Nzk0MzUxM30.SOLseepU4Ysb0KnFQYR3yWP1jikhGc89-HCynCKAhuY",
    });
  }, []);

  return (
    <>
      <Hero />
      <ConsigliatoPerTe />
      <Analisi />
      <Attivita />
      <Education />
    </>
  );
}

export default App;
