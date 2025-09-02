import { Navbar, Nav, Form, FormControl, Container } from "react-bootstrap";
import { HouseFill, PeopleFill, BriefcaseFill, ChatDotsFill, BellFill, PersonCircle, CaretDownFill, Grid3x3GapFill, StarFill } from "react-bootstrap-icons";
import "./Navbar.css";

export default function CustomNavbar() {
  return (
    <Navbar bg="light" expand="sm" className="border-bottom fixed-top px-3 py-0" style={{ height: "10vh" }}>
      <Container fluid className="d-flex align-items-center px-5">
        {/* Logo + barra di ricerca */}
        <div className="d-flex align-items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24">
            <rect width="24" height="24" fill="#0A66C2" rx="2"/>
            <path fill="#FFFFFF" d="M6.94 19H3.28V9h3.66v10zM5.11 7.41c-1.18 0-2.13-.96-2.13-2.13S3.93 3.15 5.11 3.15s2.13.96 2.13 2.13-.95 2.13-2.13 2.13zm13.79 11.59h-3.66v-4.83c0-1.15-.41-1.94-1.44-1.94-.78 0-1.24.53-1.44 1.05-.07.17-.09.41-.09.64v5.08h-3.66s.05-8.24 0-9.09h3.66v1.29c.49-.76 1.37-1.84 3.33-1.84 2.43 0 4.26 1.59 4.26 5.01v4.63z"/>
          </svg>

          <Form className="search-form">
            <i className="bi bi-search search-icon"></i>
            <FormControl type="search" placeholder="Cerca" className="px-5 search-input rounded-5"/>
          </Form>
        </div>

        {/* Toggle menu per schermi piccoli */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="ms-auto" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto text-center d-flex flex-column flex-sm-row align-items-sm-center gap-4">
            
            <Nav.Link href="#" className="d-flex flex-column align-items-center active">
              <HouseFill size={24} />
              <span>Home</span>
            </Nav.Link>

            <Nav.Link href="#" className="d-flex flex-column align-items-center">
              <PeopleFill size={24} />
              <span>Rete</span>
            </Nav.Link>

            <Nav.Link href="#" className="d-flex flex-column align-items-center">
              <BriefcaseFill size={24} />
              <span>Lavoro</span>
            </Nav.Link>

            <Nav.Link href="#" className="d-flex flex-column align-items-center">
              <ChatDotsFill size={24} />
              <span>Messaggi</span>
            </Nav.Link>

            <Nav.Link href="#" className="d-flex flex-column align-items-center">
              <BellFill size={24} />
              <span>Notifiche</span>
            </Nav.Link>

            {/* Dropdown "Tu" */}
            <div className="dropdown">
              <button className="btn d-flex flex-column align-items-center" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <PersonCircle size={24} />
                <div className="d-flex align-items-center">
                  <span className="me-1">Tu</span>
                  <CaretDownFill size={12} />
                </div>
              </button>

              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <div className="user d-flex align-items-center py-2 px-2">
                    <PersonCircle size={48} className="me-2" />
                    <div className="user-info d-flex flex-column">
                      <span className="user-name">Nome Utente</span>
                      <span className="user-job">Posizione</span>
                    </div>
                  </div>
                  <div className="user-actions px-2">
                    <button className="btn border border-primary text-primary rounded-pill me-1">Visualizza profilo</button>
                    <button className="btn bg-primary text-light rounded-pill">Verifica</button>
                  </div>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li><h6 className="dropdown-header">Account</h6></li>
                <li><a className="dropdown-item sale" href="#">50% di sconto su Sales Nav</a></li>
                <li><a className="dropdown-item" href="#">Impostazioni e privacy</a></li>
                <li><a className="dropdown-item" href="#">Guida</a></li>
                <li><a className="dropdown-item" href="#">Lingua</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><h6 className="dropdown-header">Gestisci</h6></li>
                <li><a className="dropdown-item" href="#">Post e attività</a></li>
                <li><a className="dropdown-item" href="#">Account per la pubblicazione di off...</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Esci</a></li>
              </ul>
            </div>

            {/* Linea di separazione tra dropdown */}
            <div className="border-end border mx-2" style={{ height: '100%' }}></div>

            {/* Dropdown "Aziende" */}
            <div className="dropdown">
              <button className="btn d-flex flex-column align-items-center" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <Grid3x3GapFill size={24} />
                <div className="d-flex align-items-center">
                  <span className="me-1">Per le aziende</span>
                  <CaretDownFill size={12} />
                </div>
              </button>

              <ul className="dropdown-menu aziende d-flex dropdown-menu-end justify-content-between">
                <li className="app px-5 py-4">
                  <h6 className="dropdown-header">Le mie app</h6>
                  <a className="dropdown-item" href="#"><i className="bi bi-compass"></i> Trova lead</a>
                  <a className="dropdown-item" href="#"><i className="bi bi-chat-dots"></i> Gruppi</a>
                  <a className="dropdown-item" href="#"><i className="bi bi-receipt"></i> Gestisci fatturazione</a>

                  <h6 className="dropdown-header">Talent</h6>
                  <a className="dropdown-item" href="#"><i className="bi bi-graph-up"></i> Talents insight</a>
                  <a className="dropdown-item" href="#"><i className="bi bi-broadcast"></i> Pubblica un'offerta di lavoro</a>

                  <h6 className="dropdown-header">Vendite</h6>
                  <a className="dropdown-item" href="#"><i className="bi bi-check"></i> Marketplace dei servizi</a>

                  <h6 className="dropdown-header">Marketing</h6>
                  <a className="dropdown-item" href="#"><i className="bi bi-bullseye"></i> Pubblicizza</a>

                  <h6 className="dropdown-header">Learning</h6>
                  <a className="dropdown-item" href="#"><i className="bi bi-film"></i> Learning</a>
                </li>

                <li className="border-end border mx-2" style={{ height: '85vh' }}></li>

                <li className="business px-5 py-4">
                  <h6 className="dropdown-header">Scopri altro per il business</h6>
                  <a className="dropdown-item" href="#">
                    <span>Assumi su LinkedIn</span>
                    <br /> Trova, attrai e assumi
                  </a>
                  <a className="dropdown-item" href="#">
                    <span>Vendi con LinkedIn</span>
                    <br /> Sblocca nuove opportunità di vendita
                  </a>
                  <a className="dropdown-item" href="#">
                    <span>Offerta di lavoro gratuita</span>
                    <br /> Ottieni rapidamente candidati qualificati
                  </a>
                  <a className="dropdown-item" href="#">
                    <span>Fai pubblicità su LinkedIn</span>
                    <br /> Acquisisci clienti e fai crescere la tua azienda
                  </a>
                  <a className="dropdown-item" href="#">
                    <span>Inizia con Premium</span>
                    <br /> Amplia e sfrutta la tua rete
                  </a>
                  <a className="dropdown-item" href="#">
                    <span>Impara con LinkedIn</span>
                    <br /> Corsi per formare i tuoi dipendenti
                  </a>
                  <a className="dropdown-item" href="#">
                    <span>Centro per amministratori</span>
                    <br /> Gestisci i dettagli di fatturazione e account
                  </a>
                  <a className="dropdown-item" href="#">Crea una pagina aziendale</a>
                </li>
              </ul>
            </div>

            <Nav.Link href="#" className="d-flex flex-column align-items-center">
              <StarFill size={24} />
              <span>Torna a premium</span>
            </Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}