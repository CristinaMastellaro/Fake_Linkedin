import { Col, Container, Form, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const text = [
  [
    'Informazioni',
    'Informativa sulla community personale',
    'Privacy e condizioni',
    'Sales e solutions',
    'Centro sicurezza',
  ],
  [
    'Accessibilità',
    'Carriera',
    'Opzioni per gli annunci pubblicitari',
    'Mobile',
  ],
  [
    'Talent Solutions',
    'Soluzioni di marketing',
    'Pubblicità',
    'Piccole Imprese',
  ],
];

function MyFooter() {
  const location = useLocation();

  return (
    <Container className='px-4 pb-5'>
      {location.pathname === '/' && (
        <img
          src='/logo-linkedin-scritto.png'
          width={120}
          alt='LinkedIn Logo'
          style={{ marginLeft: '-10px', marginBottom: '10px' }}
        />
      )}
      <Row>
        {text.map((dati, i) => (
          <Col sm={12} md={6} xl={2} key={i}>
            {dati.map((text, i) => (
              <div key={i} className='mb-3'>
                <a
                  href='#'
                  className='footer-link small'
                  style={{ cursor: 'pointer' }}
                >
                  {text}
                </a>
              </div>
            ))}
          </Col>
        ))}
        <Col sm={12} md={6} xl={3}>
          <div className='d-flex align-items-start mb-1'>
            <i className='bi bi-question-circle-fill me-2 fs-5'></i>
            <div>
              <div className='footer-link'>Domande?</div>
              <p className='text-secondary small'>
                Visita il nostro Centro assistenza.
              </p>
            </div>
          </div>
          <div className='d-flex align-items-start mb-1'>
            <i className='bi bi-gear-fill me-2 fs-5'></i>
            <div>
              <div className='footer-link'>
                Gestisci il tuo account e la tua privacy
              </div>
              <p className='text-secondary small'>Vai alle impostazioni</p>
            </div>
          </div>
          <div className='d-flex align-items-start mb-3'>
            <i className='bi bi-shield-shaded me-2 fs-5'></i>
            <div>
              <div className='footer-link'>
                Trasparenza sui contenuti consigliati
              </div>
              <p className='text-secondary small'>
                Scopri di più sui contenuti consigliati.
              </p>
            </div>
          </div>
        </Col>
        <Col sm={12} md={6} xl={3}>
          <Form.Label className='mb-0 me-2 small'>Seleziona Lingua</Form.Label>
          <Form.Select size='sm' className='d-block'>
            <option>Italiano (Italiano)</option>
            <option value='1'>English (Inglese)</option>
            <option value='2'>Français (Francese)</option>
            <option value='3'>Español (Spagnolo)</option>
            <option value='3'>Deutsch (Tedesco)</option>
          </Form.Select>
        </Col>
      </Row>
      <Row className='mt-0 text-secondary small'>
        <p>LinkedIn Corporation &copy; {new Date().getFullYear()}</p>
      </Row>
    </Container>
  );
}

export default MyFooter;
