import { Container, Row } from 'react-bootstrap';
import FooterHome from './FooterHome';
import FooterProfile from './FooterProfile';
import { useLocation } from 'react-router-dom';

function MyFooter() {
  const location = useLocation();

  // Footer per la home
  if (location.pathname === '/') {
    return <FooterHome />;
  }
  // Footer per il profilo
  if (location.pathname === '/profile') {
    return <FooterProfile />;
  }
}

export default MyFooter;
