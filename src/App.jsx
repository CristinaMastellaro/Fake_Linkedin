import CustomNavbar from './components/Navbar';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Container } from 'react-bootstrap';
import Homepage from './components/Homepage';
import ProfilePage from './components/ProfilePage';
import Jobs from './components/Jobs';
import DetailsPage from './components/DetailsPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './components/NotFound';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProfile } from './redux/actions';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Container>
        <div className='col-12 d-flex flex-column bg-light mb-5 py-1 navbar'>
          <CustomNavbar />
        </div>
        <Routes>
          <Route path='/profile/:id' element={<ProfilePage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/' element={<Homepage />} />
          <Route path='/lavoro' element={<Jobs />} />
          <Route path='/details/:type/:id' element={<DetailsPage />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
