import { Container, Form } from 'react-bootstrap'

const sections = [
  {
    title: 'Informazioni',
    links: [
      'Informativa sulla community personale',
      'Privacy e condizioni',
      'Sales e solutions',
      'Centro sicurezza',
    ],
  },
  {
    title: 'Scopri di più',
    links: [
      'Accessibilità',
      'Carriera',
      'Opzioni per gli annunci pubblicitari',
      'Mobile',
    ],
  },
  {
    title: 'Prodotti',
    links: ['Talent Solutions', 'Pubblicità', 'Piccole Imprese'],
  },
]

function FooterProfile() {
  return (
    <footer className="bg-light border-top pt-4 mt-5">
      <Container className="d-flex flex-column gap-1">
        {sections.map((section, i) => (
          <div key={i}>
            <h6 className="fw-bold mb-2">{section.title}</h6>
            <div className="d-flex flex-column">
              {section.links.map((link, idx) => (
                <a
                  href="#"
                  className="mb-2 text-decoration-none text-secondary footer-link"
                  key={idx}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        ))}

        <div>
          <div className="d-flex align-items-start mb-3">
            <i className="bi bi-question-circle-fill me-2 fs-4 text-primary"></i>
            <div>
              <div className="fw-bold">Domande?</div>
              <p className="text-secondary mb-0">
                Visita il nostro Centro assistenza.
              </p>
            </div>
          </div>
          <div className="d-flex align-items-start mb-3">
            <i className="bi bi-gear-fill me-2 fs-4 text-primary"></i>
            <div>
              <div className="fw-bold">
                Gestisci il tuo account e la tua privacy
              </div>
              <p className="text-secondary mb-0">Vai alle impostazioni</p>
            </div>
          </div>
          <div className="d-flex align-items-start">
            <i className="bi bi-shield-shaded me-2 fs-4 text-primary"></i>
            <div>
              <div className="fw-bold">
                Trasparenza sui contenuti consigliati
              </div>
              <p className="text-secondary mb-0">
                Scopri di più sui contenuti consigliati.
              </p>
            </div>
          </div>
        </div>

        <div>
          <Form.Label className="mb-2 fw-bold">Seleziona lingua</Form.Label>
          <Form.Select size="sm" className="w-auto">
            <option>Italiano (Italiano)</option>
            <option value="1">English (Inglese)</option>
            <option value="2">Français (Francese)</option>
            <option value="3">Español (Spagnolo)</option>
            <option value="4">Deutsch (Tedesco)</option>
          </Form.Select>
        </div>

        <div className="text-center text-secondary small mt-3">
          <img
            src="/logo-linkedin-scritto.png"
            alt="Logo-LinkedIn"
            style={{ width: 65 }}
          />
          LinkedIn Corporation &copy; {new Date().getFullYear()}
        </div>
      </Container>
    </footer>
  )
}

export default FooterProfile
