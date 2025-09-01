import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FooterHome from './components/Footer/FooterHome';
import FooterProfile from './components/Footer/FooterProfile';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<FooterHome />} />
          <Route path='/profile' element={<FooterProfile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
