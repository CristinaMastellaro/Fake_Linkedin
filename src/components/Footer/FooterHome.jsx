/* import { useState } from 'react';
import { Container, Form, Collapse, Button } from 'react-bootstrap';
import FooterProfile from './FooterProfile';

function FooterHome() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Container>
        <p>Informazioni</p>
        <p
          style={{ cursor: 'pointer', color: '#0a66c2' }}
          onClick={() => setShowForm(!showForm)}
        >
          Altro
        </p>
      </Container>
      <Collapse in={showForm}>
        <div className='footer-dropup' style={{ width: '100%' }}>
          <FooterProfile />
        </div>
      </Collapse>
    </>
  );
}

export default FooterHome; */
