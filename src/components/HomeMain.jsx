import Posts from "./Posts";

const HomeMain = () => {
  return (
    <div className="home-main">
      {/* <div className="card mb-3 shadow-sm">
        <div className="card-body">
          <div className="d-flex align-items-center mb-3">
            <img
              src="/profile-icon.png"
              alt="Profile"
              className="rounded-circle me-3"
              style={{ width: "50px", height: "50px" }}
            />
            <input
              type="text"
              className="form-control rounded-pill"
              placeholder="Crea un post"
              style={{ backgroundColor: "#f3f2ef", border: "none" }}
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
      </div> */}

      <Posts />
      {/* <Experiences /> se volete aggiungere l'opzione di crearle anche nella home  */}
    </div>
  );
};

export default HomeMain;
