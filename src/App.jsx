import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import MyFooter from './components/Footer/MyFooter';
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
        <MyFooter />
      </BrowserRouter>
    </>
  );
}

export default App;
