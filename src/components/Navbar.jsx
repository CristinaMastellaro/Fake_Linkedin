import { Navbar, NavDropdown, Nav, Form, FormControl, Container, Row, Col } from "react-bootstrap";
import { HouseFill, PeopleFill, BriefcaseFill, ChatDotsFill, BellFill, PersonCircle, CaretDownFill, Grid3x3GapFill, StarFill } from "react-bootstrap-icons";
import "../css/Navbar.css";
import { useState } from "react";
import  { useLocation, Link, } from 'react-router-dom'

export default function CustomNavbar() {
  const [addFlex, setAddFlex] = useState(false);
  const location = useLocation();

  return (
    <Navbar bg="light" expand="md" className="border-bottom fixed-top px-3 py-0">
      <Container fluid className="d-flex align-items-center justify-content-between px-5">
        {/* Logo + Search sempre visibili */}
        <div className="d-flex align-items-center gap-3">
          {/* Logo */}
          <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24">
            <rect width="24" height="24" fill="#0A66C2" rx="2" />
            <path fill="#FFFFFF" d="M6.94 19H3.28V9h3.66v10zM5.11 7.41c-1.18 0-2.13-.96-2.13-2.13S3.93 3.15 5.11 3.15s2.13.96 2.13 2.13-.95 2.13-2.13 2.13zm13.79 11.59h-3.66v-4.83c0-1.15-.41-1.94-1.44-1.94-.78 0-1.24.53-1.44 1.05-.07.17-.09.41-.09.64v5.08h-3.66s.05-8.24 0-9.09h3.66v1.29c.49-.76 1.37-1.84 3.33-1.84 2.43 0 4.26 1.59 4.26 5.01v4.63z" />
          </svg>

          {/* Barra di ricerca */}
          <Form className="search-form">
            <i className="bi bi-search search-icon"></i>
            <FormControl type="search" placeholder="Cerca" className="px-5 search-input rounded-5" />
          </Form>
        </div>

        {/* Toggle menu */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="m-1 p-1" />

        <Navbar.Collapse id="basic-navbar-nav" className="mt-3 mt-md-0">
          {/* Griglia di navigazione */}
          <Row className="g-3 text-center ms-auto text-center d-flex flex-sm-row align-items-sm-center">
            <Col xs={4} md="auto">
              <Nav.Link className={'nav-link' + (location.pathname === '/' ? ' active' : '') + " d-flex flex-column align-items-center"} to="/" as={Link}>
                <HouseFill size={22} />
                <span className="small">Home</span>
              </Nav.Link>
            </Col>

            <Col xs={4} md="auto">
              <Nav.Link className={'nav-link' + (location.pathname === '/rete' ? ' active' : '') + " d-flex flex-column align-items-center"} to="/rete" as={Link}>
                <PeopleFill size={22} />
                <span className="small">Rete</span>
              </Nav.Link>
            </Col>

            <Col xs={4} md="auto">
              <Nav.Link className={'nav-link' + (location.pathname === '/lavoro' ? ' active' : '') + " d-flex flex-column align-items-center"} to="/lavoro" as={Link}>
                <BriefcaseFill size={22} />
                <span className="small">Lavoro</span>
              </Nav.Link>
            </Col>

            <Col xs={4} md="auto">
              <Nav.Link className={'nav-link' + (location.pathname === '/lavoro' ? ' active' : '') + " d-flex flex-column align-items-center"} to="/lavoro" as={Link}>
                <ChatDotsFill size={22} />
                <span className="small">Messaggi</span>
              </Nav.Link>
            </Col>

            <Col xs={4} md="auto">
              <Nav.Link className={'nav-link' + (location.pathname === '/notifiche' ? ' active' : '') + " d-flex flex-column align-items-center"} to="/notifiche" as={Link}>
                <BellFill size={22} />
                <span className="small">Notifiche</span>
              </Nav.Link>
            </Col>

            {/* Dropdown "Tu" */}
            <Col xs={4} md="auto" className="d-none d-md-block">
              <div className="dropdown">
                <button
                  className="btn d-flex flex-column align-items-center"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
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
                      <Link to="/profile">
                        <button className="btn border border-primary text-primary rounded-pill me-1">
                            Visualizza profilo
                        </button>
                      </Link>
                      <button className="btn bg-primary text-light rounded-pill" title="Not available">Verifica</button>
                    </div>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><h6 className="dropdown-header">Account</h6></li>
                  <li><a className="dropdown-item sale" href="#" title="Not available">50% di sconto su Sales Nav</a></li>
                  <li><a className="dropdown-item" href="#" title="Not available">Impostazioni e privacy</a></li>
                  <li><a className="dropdown-item" href="#" title="Not available">Guida</a></li>
                  <li><a className="dropdown-item" href="#" title="Not available">Lingua</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><h6 className="dropdown-header">Gestisci</h6></li>
                  <li><a className="dropdown-item" href="#" title="Not available">Post e attività</a></li>
                  <li><a className="dropdown-item" href="#" title="Not available">Account per la pubblicazione di off...</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="#" title="Not available">Esci</a></li>
                </ul>
              </div>
            </Col>

            {/* Dropdown "Aziende" */}
            <Col xs={4} md="auto" className="d-none d-md-block">
              <div className="dropdown">
                <button
                  className="btn d-flex flex-column align-items-center"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  onClick={() => setAddFlex(!addFlex)}
                >
                  <Grid3x3GapFill size={24} />
                  <div className="d-flex align-items-center">
                    <span className="me-1">Per le aziende</span>
                    <CaretDownFill size={12} />
                  </div>
                </button>

                <ul
                  className={
                    addFlex
                      ? "dropdown-menu d-flex aziende dropdown-menu-end justify-content-between"
                      : "dropdown-menu aziende dropdown-menu-end justify-content-between"
                  }
                >
                  <li className="app px-5 py-4">
                    <h6 className="dropdown-header">Le mie app</h6>
                    <a className="dropdown-item" href="#" title="Not available"><i className="bi bi-compass"></i> Trova lead</a>
                    <a className="dropdown-item" href="#" title="Not available"><i className="bi bi-chat-dots"></i> Gruppi</a>
                    <a className="dropdown-item" href="#" title="Not available"><i className="bi bi-receipt"></i> Gestisci fatturazione</a>

                    <h6 className="dropdown-header">Talent</h6>
                    <a className="dropdown-item" href="#" title="Not available"><i className="bi bi-graph-up"></i> Talents insight</a>
                    <a className="dropdown-item" href="#" title="Not available"><i className="bi bi-broadcast"></i> Pubblica un'offerta di lavoro</a>

                    <h6 className="dropdown-header">Vendite</h6>
                    <a className="dropdown-item" href="#" title="Not available"><i className="bi bi-check"></i> Marketplace dei servizi</a>

                    <h6 className="dropdown-header">Marketing</h6>
                    <a className="dropdown-item" href="#" title="Not available"><i className="bi bi-bullseye"></i> Pubblicizza</a>

                    <h6 className="dropdown-header">Learning</h6>
                    <a className="dropdown-item" href="#" title="Not available"><i className="bi bi-film"></i> Learning</a>
                  </li>

                  <li className="border-end border mx-2" style={{ height: "85vh" }}></li>

                  <li className="business px-5 py-4">
                    <h6 className="dropdown-header">Scopri altro per il business</h6>
                    <a className="dropdown-item" href="#" title="Not available">
                      <span>Assumi su LinkedIn</span>
                      <br /> Trova, attrai e assumi
                    </a>
                    <a className="dropdown-item" href="#" title="Not available">
                      <span>Vendi con LinkedIn</span>
                      <br /> Sblocca nuove opportunità di vendita
                    </a>
                    <a className="dropdown-item" href="#" title="Not available">
                      <span>Offerta di lavoro gratuita</span>
                      <br /> Ottieni rapidamente candidati qualificati
                    </a>
                    <a className="dropdown-item" href="#" title="Not available">
                      <span>Fai pubblicità su LinkedIn</span>
                      <br /> Acquisisci clienti e fai crescere la tua azienda
                    </a>
                    <a className="dropdown-item" href="#" title="Not available">
                      <span>Inizia con Premium</span>
                      <br /> Amplia e sfrutta la tua rete
                    </a>
                    <a className="dropdown-item" href="#" title="Not available">
                      <span>Impara con LinkedIn</span>
                      <br /> Corsi per formare i tuoi dipendenti
                    </a>
                    <a className="dropdown-item" href="#" title="Not available">
                      <span>Centro per amministratori</span>
                      <br /> Gestisci i dettagli di fatturazione e account
                    </a>
                    <a className="dropdown-item" href="#" title="Not available">Crea una pagina aziendale</a>
                  </li>
                </ul>
              </div>
            </Col>

            {/* Premium */}
            <Col xs={4} md="auto" className="d-none d-md-block">
              <Nav.Link href="/premium" className="d-flex flex-column align-items-center">
                <StarFill size={22} />
                <span className="small">Premium</span>
              </Nav.Link>
            </Col>

            <Col xs={4} className="d-block d-sm-none text-center">
              <PersonCircle size={24} />
              <NavDropdown id="nav-dropdown-dark-example" title="" align="end">
                <NavDropdown.Item href="#" title="Not available">Account</NavDropdown.Item>
                <NavDropdown.Item href="#" title="Not available">Impostazioni</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#" title="Not available">Esci</NavDropdown.Item>
              </NavDropdown>
            </Col>
          </Row>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}