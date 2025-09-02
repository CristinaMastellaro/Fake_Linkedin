import { useState } from "react";

const SidebarProfilo = () => {
  const [isEditingLanguage, setIsEditingLanguage] = useState(false);
  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const [language, setLanguage] = useState("Italiano");
  const [profileUrl, setProfileUrl] = useState(
    "www.linkedin.com/in/cristina-mastellaro-72156a213"
  );
  const [showAllProfiles, setShowAllProfiles] = useState(false);

  const languages = ["Italiano", "English", "Français", "Deutsch", "Español"];

  const additionalProfiles = [
    {
      id: 1,
      name: "Marco Rossi",
      role: "Senior Software Engineer presso TechCorp",
      initials: "MR",
      color: "#007bb6",
    },
    {
      id: 2,
      name: "Sofia Bianchi",
      role: "Marketing Manager presso Digital Agency",
      initials: "SB",
      color: "#dc3545",
    },
    {
      id: 3,
      name: "Alessandro Verdi",
      role: "Data Scientist presso Analytics Pro",
      initials: "AV",
      color: "#6f42c1",
    },
    {
      id: 4,
      name: "Giulia Neri",
      role: "UX Designer presso Creative Studio",
      initials: "GN",
      color: "#fd7e14",
    },
  ];

  const handleLanguageSubmit = (e) => {
    e.preventDefault();
    setIsEditingLanguage(false);
  };

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    setIsEditingUrl(false);
  };

  const handleLanguageCancel = () => {
    setIsEditingLanguage(false);
  };

  const handleUrlCancel = () => {
    setIsEditingUrl(false);
  };

  return (
    // <div className="col-12 col-md-12 col-lg-3">
    <div className="mt-4">
      <div className="card mb-3 shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="flex-grow-1">
              <h6 className="mb-0 fw-bold">Lingua del profilo</h6>
              {isEditingLanguage ? (
                <form onSubmit={handleLanguageSubmit} className="mt-2">
                  <select
                    className="form-select form-select-sm"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    autoFocus
                  >
                    {languages.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                  <div className="mt-2">
                    <button
                      type="submit"
                      className="btn btn-primary btn-sm me-2"
                    >
                      Salva
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={handleLanguageCancel}
                    >
                      Annulla
                    </button>
                  </div>
                </form>
              ) : (
                <small className="text-muted">{language}</small>
              )}
            </div>
            {!isEditingLanguage && (
              <i
                className="bi bi-pencil"
                style={{ cursor: "pointer" }}
                onClick={() => setIsEditingLanguage(true)}
              ></i>
            )}
          </div>

          <hr className="my-3" />

          <div className="d-flex justify-content-between align-items-start mb-3">
            <div className="flex-grow-1">
              <h6 className="mb-0 fw-bold">Profilo pubblico e URL</h6>
              {isEditingUrl ? (
                <form onSubmit={handleUrlSubmit} className="mt-2">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    value={profileUrl}
                    onChange={(e) => setProfileUrl(e.target.value)}
                    placeholder="Inserisci URL del profilo"
                    autoFocus
                  />
                  <div className="mt-2">
                    <button
                      type="submit"
                      className="btn btn-primary btn-sm me-2"
                    >
                      Salva
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={handleUrlCancel}
                    >
                      Annulla
                    </button>
                  </div>
                </form>
              ) : (
                <small className="text-muted text-break">{profileUrl}</small>
              )}
            </div>
            {!isEditingUrl && (
              <i
                className="bi bi-pencil ms-2"
                style={{ cursor: "pointer" }}
                onClick={() => setIsEditingUrl(true)}
              ></i>
            )}
          </div>

          <div className="text-end">
            <button className="btn btn-link text-muted p-0">
              Annuncio <i className="bi bi-three-dots"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body text-center">
          <div className="mb-3">
            <div className="d-inline-block p-3 rounded">
              <img
                src="/linkedin-icon.jpg"
                alt="icona-linkedin"
                style={{ width: "8rem" }}
              />
            </div>
          </div>
          <p className="text-muted mb-3">
            Fatti trovare per le posizioni giuste
          </p>
          <button className="btn btn-outline-primary rounded-pill fw-bold">
            Le tue preferenze
          </button>
        </div>
      </div>

      <div className="card mb-3 shadow-sm">
        <div className="card-header bg-white border-0 pb-0">
          <h6 className="mb-1 fw-bold text-dark">Altri profili consultati</h6>
          <small className="text-muted">
            <i className="bi bi-eye-fill"></i> Solo per te
          </small>
        </div>
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div className="d-flex align-items-center">
              <div
                className="rounded-circle me-3 bg-secondary"
                style={{ width: "50px", height: "50px" }}
              ></div>
              <div>
                <h6 className="mb-0 fw-semibold">Qualcuno presso</h6>
                <small className="text-muted">Università degli Studi...</small>
              </div>
            </div>
            <button className="btn btn-outline-primary btn-sm rounded-pill">
              Visualizza
            </button>
          </div>

          <hr className="my-3" />

          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <div
                className="rounded-circle me-3 bg-warning"
                style={{ width: "50px", height: "50px" }}
              ></div>
              <div>
                <h6 className="mb-0 fw-semibold">
                  Consulente informatico presso...
                </h6>
              </div>
            </div>
            <button className="btn btn-outline-primary btn-sm rounded-pill">
              Visualizza
            </button>
          </div>
        </div>
      </div>

      <div className="card mb-3 shadow-sm">
        <div className="card-header bg-white border-0 pb-0">
          <h6 className="mb-1 fw-bold text-dark">
            Persone che potresti conoscere
          </h6>
          <small className="text-muted">Dalla tua scuola o università</small>
        </div>
        <div className="card-body">
          <div className="d-flex align-items-center mb-3">
            <img
              src="/profile-icon.png"
              alt="Leonardo Genesin"
              className="rounded-circle me-3"
              style={{ width: "50px", height: "50px" }}
            />
            <div className="flex-grow-1">
              <h6 className="mb-0 fw-semibold">Leonardo Genesin</h6>
              <small className="text-muted">
                PhD Student in Statistical Sciences presso Università de...
              </small>
              <div className="mt-2">
                <button className="btn btn-outline-secondary btn-sm rounded-pill">
                  <i className="bi bi-person-plus-fill"></i> Collegati
                </button>
              </div>
            </div>
          </div>

          <hr className="my-3" />

          <div className="d-flex align-items-center mb-3">
            <img
              src="profile-icon.png"
              alt="Marta Ferrari"
              className="rounded-circle me-3"
              style={{ width: "50px", height: "50px" }}
            />
            <div className="flex-grow-1">
              <h6 className="mb-0 fw-semibold">Marta Ferrari</h6>
              <small className="text-muted">
                Hanno frequentato Università degli Studi di Padova
              </small>
              <div className="mt-2">
                <button className="btn btn-outline-secondary btn-sm rounded-pill">
                  <i className="bi bi-person-plus-fill"></i> Collegati
                </button>
              </div>
            </div>
          </div>

          <hr className="my-3" />

          <div className="d-flex align-items-center">
            <img
              src="profile-icon.png"
              alt="Chiara Baldan"
              className="rounded-circle me-3"
              style={{ width: "50px", height: "50px" }}
            />
            <div className="flex-grow-1">
              <h6 className="mb-0 fw-semibold">
                Chiara Baldan
                <i
                  className="fas fa-check-circle text-primary ms-1"
                  style={{ fontSize: "12px" }}
                ></i>
              </h6>
              <small className="text-muted">Research Fellow</small>
              <div className="mt-2">
                <button className="btn btn-outline-secondary btn-sm rounded-pill">
                  <i className="bi bi-person-plus-fill"></i> Collegati
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card mb-3 shadow-sm">
        <div className="card-body text-center">
          <div className="d-flex align-items-center mb-3">
            <img
              src="profile-icon.png"
              alt="Diego Redi"
              className="rounded-circle me-3"
              style={{ width: "50px", height: "50px" }}
            />
            <div className="text-start">
              <h6 className="mb-0 fw-bold">Diego Redi</h6>
              <small className="text-muted">
                Junior Business Analyst presso ARD Raccanello
              </small>
            </div>
          </div>
          <button className="btn btn-outline-secondary btn-sm mb-3 rounded-pill">
            <i className="bi bi-person-plus-fill"></i> Collegati
          </button>

          {showAllProfiles && (
            <>
              {additionalProfiles.map((profile) => (
                <div key={profile.id}>
                  <hr />
                  <div className="d-flex align-items-center mb-3">
                    <img
                      src={"profile-icon.png"}
                      alt={profile.name}
                      className="rounded-circle me-3"
                      style={{ width: "50px", height: "50px" }}
                    />
                    <div className="text-start">
                      <h6 className="mb-0 fw-bold">{profile.name}</h6>
                      <small className="text-muted">{profile.role}</small>
                    </div>
                  </div>
                  <button className="btn btn-outline-secondary btn-sm mb-3 rounded-pill">
                    <i className="bi bi-person-plus-fill"></i> Collegati
                  </button>
                </div>
              ))}
            </>
          )}

          <hr />
          <p
            className="text-primary mb-0 fw-semibold"
            style={{ cursor: "pointer" }}
            onClick={() => setShowAllProfiles(!showAllProfiles)}
          >
            {showAllProfiles ? "Mostra meno" : "Mostra tutto"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SidebarProfilo;
