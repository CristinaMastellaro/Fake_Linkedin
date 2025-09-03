import CustomNavbar from "./components/Navbar";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Container } from "react-bootstrap";
import Messaggistica from "./components/Messaggistica";
import Homepage from "./pages/Homepage";
import ProfilePage from "./pages/ProfilePage";
import Jobs from "./pages/Jobs";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProfile } from "./redux/actions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Container>
        <div className="col-12 d-flex flex-column bg-light mb-5 py-1">
          <CustomNavbar />
        </div>
        <Routes>
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/lavoro" element={<Jobs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
      <Messaggistica />
    </BrowserRouter>
  );
}

export default App;
