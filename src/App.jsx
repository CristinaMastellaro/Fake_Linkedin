import CustomNavbar from "./components/Navbar";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Container } from "react-bootstrap";
import Messaggistica from "./components/Messaggistica";
import Homepage from "./components/Homepage";
import ProfilePage from "./components/ProfilePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Container>
        <div className="col-12 d-flex flex-column bg-light mb-5">
          <CustomNavbar />
        </div>
        <Routes>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/" element={<Homepage />} />
        </Routes>
      </Container>
      <Messaggistica />
    </BrowserRouter>
  );
}

export default App;
