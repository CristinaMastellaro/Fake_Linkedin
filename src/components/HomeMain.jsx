const HomeMain = () => {
  return (
    <div className="home-main mt-5">
      <div className="card mb-3 shadow-sm">
        <div className="card-body">
          <div className="d-flex align-items-center mb-3">
            <img
              src="/profile-icon.png"
              alt="Profile"
              className="rounded-circle me-3"
              style={{ width: '50px', height: '50px' }}
            />
            <input
              type="text"
              className="form-control rounded-pill"
              placeholder="Crea un post"
              style={{ backgroundColor: '#f3f2ef', border: 'none' }}
            />
          </div>
          <div className="d-flex justify-content-around">
            <button className="btn btn-light d-flex align-items-center">
              <i className="bi bi-camera-video text-primary me-2"></i>
              Video
            </button>
            <button className="btn btn-light d-flex align-items-center">
              <i className="bi bi-image text-success me-2"></i>
              Foto
            </button>
            <button className="btn btn-light d-flex align-items-center">
              <i className="bi bi-pencil-square text-warning me-2"></i>
              Scrivi un articolo
            </button>
          </div>
        </div>
      </div>

      {/* Post 1 */}
      <div className="card mb-3 shadow-sm">
        <div className="card-body">
          <div className="d-flex align-items-start mb-3">
            <img
              src="/profile-icon.png"
              alt="Profile"
              className="rounded-circle me-3"
              style={{ width: '50px', height: '50px' }}
            />
            <div className="flex-grow-1">
              <h6 className="mb-0 fw-bold">Marco Bianchi</h6>
              <small className="text-muted">
                Senior Developer presso TechCorp • 2g
              </small>
            </div>
            <div className="dropdown">
              <button className="btn btn-link text-muted" type="button">
                <i className="bi bi-three-dots"></i>
              </button>
            </div>
          </div>

          <p className="card-text">
            Entusiasta di condividere che il nostro team ha appena lanciato una
            nuova feature che migliorerà l'esperienza utente del 40%! 🚀 Grazie
            a tutti i colleghi che hanno reso possibile questo traguardo.
            #Innovation #Teamwork
          </p>

          <img
            src="https://via.placeholder.com/600x300"
            alt="Post content"
            className="img-fluid rounded mb-3"
          />

          <div className="d-flex justify-content-between align-items-center border-top pt-2">
            <small className="text-muted">
              <i className="bi bi-hand-thumbs-up-fill text-primary"></i> 45
              reazioni
            </small>
            <small className="text-muted">12 commenti</small>
          </div>

          <div className="d-flex justify-content-around mt-2 pt-2 border-top">
            <button className="btn btn-light flex-fill me-1">
              <i className="bi bi-hand-thumbs-up me-2"></i>Mi piace
            </button>
            <button className="btn btn-light flex-fill me-1">
              <i className="bi bi-chat me-2"></i>Commenta
            </button>
            <button className="btn btn-light flex-fill me-1">
              <i className="bi bi-arrow-repeat me-2"></i>Condividi
            </button>
            <button className="btn btn-light flex-fill">
              <i className="bi bi-send me-2"></i>Invia
            </button>
          </div>
        </div>
      </div>

      {/* Post 2 */}
      <div className="card mb-3 shadow-sm">
        <div className="card-body">
          <div className="d-flex align-items-start mb-3">
            <img
              src="/profile-icon.png"
              alt="Profile"
              className="rounded-circle me-3"
              style={{ width: '50px', height: '50px' }}
            />
            <div className="flex-grow-1">
              <h6 className="mb-0 fw-bold">Giulia Rossi</h6>
              <small className="text-muted">
                Marketing Manager presso DigitalAgency • 1g
              </small>
            </div>
            <div className="dropdown">
              <button className="btn btn-link text-muted" type="button">
                <i className="bi bi-three-dots"></i>
              </button>
            </div>
          </div>

          <p className="card-text">
            Appena concluso un workshop incredibile sul digital marketing! 📈 Le
            nuove strategie di content marketing stanno rivoluzionando il modo
            in cui comunichiamo con i nostri clienti. Condivido alcune insights
            chiave nei commenti! #DigitalMarketing #ContentStrategy
          </p>

          <div className="d-flex justify-content-between align-items-center border-top pt-2">
            <small className="text-muted">
              <i className="bi bi-hand-thumbs-up-fill text-primary"></i>
              <i className="bi bi-heart-fill text-danger"></i> 87 reazioni
            </small>
            <small className="text-muted">23 commenti</small>
          </div>

          <div className="d-flex justify-content-around mt-2 pt-2 border-top">
            <button className="btn btn-light flex-fill me-1">
              <i className="bi bi-hand-thumbs-up me-2"></i>Mi piace
            </button>
            <button className="btn btn-light flex-fill me-1">
              <i className="bi bi-chat me-2"></i>Commenta
            </button>
            <button className="btn btn-light flex-fill me-1">
              <i className="bi bi-arrow-repeat me-2"></i>Condividi
            </button>
            <button className="btn btn-light flex-fill">
              <i className="bi bi-send me-2"></i>Invia
            </button>
          </div>
        </div>
      </div>

      {/* Post 3 */}
      <div className="card mb-3 shadow-sm">
        <div className="card-body">
          <div className="d-flex align-items-start mb-3">
            <img
              src="/profile-icon.png"
              alt="Profile"
              className="rounded-circle me-3"
              style={{ width: '50px', height: '50px' }}
            />
            <div className="flex-grow-1">
              <h6 className="mb-0 fw-bold">Alessandro Verdi</h6>
              <small className="text-muted">CEO presso StartupTech • 3g</small>
            </div>
            <div className="dropdown">
              <button className="btn btn-link text-muted" type="button">
                <i className="bi bi-three-dots"></i>
              </button>
            </div>
          </div>

          <p className="card-text">
            Siamo orgogliosi di annunciare che la nostra startup ha chiuso un
            round di finanziamento Serie A! 💰 Questo ci permetterà di espandere
            il team e accelerare lo sviluppo dei nostri prodotti. Il futuro è
            luminoso! #Startup #Funding #Growth
          </p>

          <div className="bg-light p-3 rounded mb-3">
            <div className="d-flex align-items-center">
              <i
                className="bi bi-newspaper text-primary me-3"
                style={{ fontSize: '2rem' }}
              ></i>
              <div>
                <h6 className="mb-1">
                  StartupTech chiude round Serie A da 5M€
                </h6>
                <small className="text-muted">techcrunch.it</small>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center border-top pt-2">
            <small className="text-muted">
              <i className="bi bi-hand-thumbs-up-fill text-primary"></i>
              <i className="bi bi-hand-thumbs-up-fill text-success"></i> 156
              reazioni
            </small>
            <small className="text-muted">34 commenti • 8 condivisioni</small>
          </div>

          <div className="d-flex justify-content-around mt-2 pt-2 border-top">
            <button className="btn btn-light flex-fill me-1">
              <i className="bi bi-hand-thumbs-up me-2"></i>Mi piace
            </button>
            <button className="btn btn-light flex-fill me-1">
              <i className="bi bi-chat me-2"></i>Commenta
            </button>
            <button className="btn btn-light flex-fill me-1">
              <i className="bi bi-arrow-repeat me-2"></i>Condividi
            </button>
            <button className="btn btn-light flex-fill">
              <i className="bi bi-send me-2"></i>Invia
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeMain
