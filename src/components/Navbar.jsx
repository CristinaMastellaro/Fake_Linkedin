import {
  Navbar,
  NavDropdown,
  Nav,
  Form,
  FormControl,
  Container,
  Row,
  Col,
} from 'react-bootstrap'
import {
  HouseFill,
  PeopleFill,
  BriefcaseFill,
  ChatDotsFill,
  BellFill,
  PersonCircle,
  CaretDownFill,
  Grid3x3GapFill,
  StarFill,
} from 'react-bootstrap-icons'
import { useState, useEffect, useRef } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import SearchModal from './SearchModal'
import '../css/Navbar.css'
import { setPageAction, TOKEN } from '../redux/actions'

export default function CustomNavbar() {
  const [addFlex, setAddFlex] = useState(false)
  const location = useLocation()
  const { myProfile } = useSelector((state) => state.saveProfileMe)

  const dispatch = useDispatch()

  // stati per la ricerca
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const searchRef = useRef(null)

  useEffect(() => {
    if (searchTerm.trim().length === 0) {
      setResults([])
      setShowModal(false)
      return
    }

    const fetchProfiles = async () => {
      setLoading(true)
      try {
        const res = await fetch(
          'https://striveschool-api.herokuapp.com/api/profile/',
          {
            headers: { Authorization: `Bearer ${TOKEN}` },
          }
        )

        if (!res.ok) {
          throw new Error('Errore nella fetch: ' + res.status)
        }

        const data = await res.json()

        const filtered = data.filter((p) =>
          (p.name + ' ' + p.surname)
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )

        setResults(filtered)
        setShowModal(true)
      } catch (err) {
        console.error('Errore fetch profili:', err)
      } finally {
        setLoading(false)
      }
    }

    const timeout = setTimeout(fetchProfiles, 400)
    return () => clearTimeout(timeout)
  }, [searchTerm])

  const handleResetSearch = () => {
    setSearchTerm('')
    setResults([])
    setShowModal(false)
  }

  return (
    <Navbar
      bg="light"
      expand="lg"
      className="border-bottom fixed-top px-3 py-0"
    >
      <Container
        fluid
        className="d-flex align-items-center justify-content-between px-5"
      >
        {/* Logo + Search */}
        <div className="d-flex align-items-center gap-3 position-relative">
          {/* Logo */}
          <Link to="/">
            <img
              src="/linkedin-icon.jpg"
              alt="icona-linkedin"
              style={{ width: 35, height: 35 }}
              onClick={() => {
                dispatch(setPageAction(1))
                window.scrollTo({ top: 0, left: 0 })
                handleResetSearch()
              }}
            />
          </Link>

          {/* Barra di ricerca */}
          <Form
            className="search-form"
            ref={searchRef}
            onSubmit={(e) => {
              e.preventDefault()
              handleResetSearch()
            }}
          >
            <i className="bi bi-search search-icon"></i>
            <FormControl
              type="search"
              placeholder="Cerca"
              className="px-5 search-input rounded-5"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => searchTerm.trim() && setShowModal(true)}
              onBlur={() => setTimeout(() => setShowModal(false), 200)}
            />
          </Form>

          {/* Modale a tendina */}
          {showModal && searchRef.current && (
            <div
              className="scrollbar-hidden"
              style={{
                position: 'absolute',
                top:
                  searchRef.current.getBoundingClientRect().bottom +
                  window.scrollY,
                left:
                  searchRef.current.getBoundingClientRect().left +
                  window.scrollX,
                width: searchRef.current.offsetWidth,
                zIndex: 1050,
                maxHeight: '70vh',
                overflowY: 'auto',
              }}
            >
              <SearchModal
                results={results}
                searchTerm={searchTerm}
                loading={loading}
                onClose={() => setShowModal(false)}
                onSelect={handleResetSearch}
              />
            </div>
          )}
        </div>

        {/* Toggle menu */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="m-1 p-1" />

        <Navbar.Collapse id="basic-navbar-nav" className="mt-3 mt-md-0">
          {/* Griglia di navigazione */}
          <Row className="g-3 text-center ms-auto text-center d-flex flex-sm-row align-items-sm-center">
            <Col xs={4} md="auto">
              <Nav.Link
                className={
                  'nav-link' +
                  (location.pathname === '/' ? ' active' : '') +
                  ' d-flex flex-column align-items-center'
                }
                to="/"
                as={Link}
                onClick={() => {
                  dispatch(setPageAction(1))
                  window.scrollTo({ top: 0, left: 0 })
                }}
              >
                <HouseFill size={22} />
                <span className="small">Home</span>
              </Nav.Link>
            </Col>

            <Col xs={4} md="auto">
              <Nav.Link
                className={
                  'nav-link' +
                  (location.pathname === '/rete' ? ' active' : '') +
                  ' d-flex flex-column align-items-center'
                }
                to="/rete"
                as={Link}
              >
                <PeopleFill size={22} />
                <span className="small">Rete</span>
              </Nav.Link>
            </Col>

            <Col xs={4} md="auto">
              <Nav.Link
                className={
                  'nav-link' +
                  (location.pathname === '/lavoro' ? ' active' : '') +
                  ' d-flex flex-column align-items-center'
                }
                to="/lavoro"
                as={Link}
              >
                <BriefcaseFill size={22} />
                <span className="small">Lavoro</span>
              </Nav.Link>
            </Col>

            <Col xs={4} md="auto">
              <Nav.Link
                className={
                  'nav-link' +
                  (location.pathname === '/messaggi' ? ' active' : '') +
                  ' d-flex flex-column align-items-center'
                }
                to="/messaggi"
                as={Link}
              >
                <ChatDotsFill size={22} />
                <span className="small">Messaggi</span>
              </Nav.Link>
            </Col>

            <Col xs={4} md="auto">
              <Nav.Link
                className={
                  'nav-link' +
                  (location.pathname === '/notifiche' ? ' active' : '') +
                  ' d-flex flex-column align-items-center'
                }
                to="/notifiche"
                as={Link}
              >
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
                      {myProfile.image ? (
                        <img
                          src={myProfile.image}
                          alt={`${myProfile.name} ${myProfile.surname}`}
                          className="rounded-circle me-2"
                          width={48}
                          height={48}
                        />
                      ) : (
                        <PersonCircle size={48} className="me-2" />
                      )}
                      <div className="user-info d-flex flex-column">
                        <span className="user-name">
                          {myProfile.name} {myProfile.surname}
                        </span>
                        <span className="user-job">{myProfile.title}</span>
                      </div>
                    </div>

                    <div className="user-actions px-2">
                      <Link to="/profile">
                        <button className="btn border border-primary text-primary rounded-pill me-1">
                          Visualizza profilo
                        </button>
                      </Link>
                      <button
                        className="btn bg-primary text-light rounded-pill"
                        title="Not available"
                      >
                        Verifica
                      </button>
                    </div>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <h6 className="dropdown-header">Account</h6>
                  </li>
                  <li>
                    <a
                      className="dropdown-item sale"
                      href="#"
                      title="Not available"
                    >
                      50% di sconto su Sales Nav
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#" title="Not available">
                      Impostazioni e privacy
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#" title="Not available">
                      Guida
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#" title="Not available">
                      Lingua
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <h6 className="dropdown-header">Gestisci</h6>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#" title="Not available">
                      Post e attività
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#" title="Not available">
                      Account per la pubblicazione di off...
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#" title="Not available">
                      Esci
                    </a>
                  </li>
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
                      ? 'dropdown-menu d-flex aziende dropdown-menu-end justify-content-between'
                      : 'dropdown-menu aziende dropdown-menu-end justify-content-between'
                  }
                >
                  <li className="app px-5 py-4">
                    <h6 className="dropdown-header">Le mie app</h6>
                    <a className="dropdown-item" href="#" title="Not available">
                      <i className="bi bi-compass"></i> Trova lead
                    </a>
                    <a className="dropdown-item" href="#" title="Not available">
                      <i className="bi bi-chat-dots"></i> Gruppi
                    </a>
                    <a className="dropdown-item" href="#" title="Not available">
                      <i className="bi bi-receipt"></i> Gestisci fatturazione
                    </a>

                    <h6 className="dropdown-header">Talent</h6>
                    <a className="dropdown-item" href="#" title="Not available">
                      <i className="bi bi-graph-up"></i> Talents insight
                    </a>
                    <a className="dropdown-item" href="#" title="Not available">
                      <i className="bi bi-broadcast"></i> Pubblica un'offerta di
                      lavoro
                    </a>

                    <h6 className="dropdown-header">Vendite</h6>
                    <a className="dropdown-item" href="#" title="Not available">
                      <i className="bi bi-check"></i> Marketplace dei servizi
                    </a>

                    <h6 className="dropdown-header">Marketing</h6>
                    <a className="dropdown-item" href="#" title="Not available">
                      <i className="bi bi-bullseye"></i> Pubblicizza
                    </a>

                    <h6 className="dropdown-header">Learning</h6>
                    <a className="dropdown-item" href="#" title="Not available">
                      <i className="bi bi-film"></i> Learning
                    </a>
                  </li>

                  <li
                    className="border-end border mx-2"
                    style={{ height: '85vh' }}
                  ></li>

                  <li className="business px-5 py-4">
                    <h6 className="dropdown-header">
                      Scopri altro per il business
                    </h6>
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
                    <a className="dropdown-item" href="#" title="Not available">
                      Crea una pagina aziendale
                    </a>
                  </li>
                </ul>
              </div>
            </Col>

            {/* Premium */}
            <Col xs={4} md="auto" className="d-none d-md-block">
              <Nav.Link
                href="/premium"
                className="d-flex flex-column align-items-center"
              >
                <StarFill size={22} />
                <span className="small">Premium</span>
              </Nav.Link>
            </Col>

            {/* Dropdown "Tu" per xs */}
            <Col xs={4} className="d-block d-sm-none text-center">
              <PersonCircle size={24} />
              <NavDropdown id="nav-dropdown-dark-example" title="" align="end">
                <NavDropdown.Item href="#" title="Not available">
                  Account
                </NavDropdown.Item>
                <NavDropdown.Item href="#" title="Not available">
                  Impostazioni
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#" title="Not available">
                  Esci
                </NavDropdown.Item>
              </NavDropdown>
            </Col>
          </Row>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
