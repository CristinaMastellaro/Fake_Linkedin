import { useState } from "react";
import { Card } from "react-bootstrap";
import "../css/rightSidebarHome.css";
import { BiPlus } from "react-icons/bi";

function SidebarHome() {
  const [showAllNews, setShowAllNews] = useState(false);

  const news = [
    {
      id: 1,
      title: "Il falso mito dell'impatto zero",
      published: "3 ore fa",
      readers: "585 lettori",
    },
    {
      id: 2,
      title: "Quanto vale la cucina italiana",
      published: "3 giorni fa",
      readers: "452 lettori",
    },
    {
      id: 3,
      title: "Il primo semestre di Iliad",
      published: "4 giorni fa",
      readers: "349 lettori",
    },
    {
      id: 4,
      title: "Mediaset conquista la tedesca Prosieben",
      published: "10 ore fa",
      readers: "264 lettori",
    },
    {
      id: 5,
      title: "McDonald's investe sull'Italia",
      published: "3 giorni fa",
      readers: "174 lettori",
    },
  ];

  return (
    <>
      <div className="card mb-3 shadow-sm">
        <div className="card-body p-0">
          <div className="px-3 pt-3 d-flex justify-content-between">
            <h5 className="fw-bold">LinkedIn Notizie</h5>
            <i className="bi bi-info-square-fill"></i>
          </div>
          <div className="px-3">
            <h6 className="text-muted fw-bold">Storie Principali</h6>
          </div>
          <div className="link px-3">
            <p className="mb-0 fw-bold">Venezia 82: racconti dal Lido</p>
            <p className="fw-6 text-muted small mb-2">
              4 giorni fa &bull; 1.869 lettori
            </p>
          </div>
          <div className="link px-3">
            <p className="mb-0 fw-bold">Greenpeace Italia cambia guida</p>
            <p className="fw-6 text-muted small mb-2">3 ore fa</p>
          </div>
          <div className="link px-3">
            <p className="mb-0 fw-bold">Si (ri)parla di caro scuola</p>
            <p className="fw-6 text-muted small mb-2">25 minuti fa</p>
          </div>
          <div className="link px-3">
            <p className="mb-0 fw-bold">Smart working e lavoro femminile</p>
            <p className="fw-6 text-muted small mb-2">
              3 giorni fa &bull; 1.394 lettori
            </p>
          </div>
          <div className=" link px-3">
            <p className="mb-0 fw-bold">Fame di data center</p>
            <p className="fw-6 text-muted small mb-2">
              5 giorni fa &bull; 698 lettori
            </p>
          </div>

          {showAllNews && (
            <>
              {news.map((text) => (
                <div key={text.id} className="link px-3">
                  <p className="mb-0 fw-bold">{text.title}</p>
                  <p className="fw-6 text-muted small mb-2">
                    {text.published} &bull; {text.readers}
                  </p>
                </div>
              ))}
            </>
          )}
          <p
            className="mb-0 fw-semibold px-3 pb-3"
            style={{ cursor: "pointer" }}
            onClick={() => setShowAllNews(!showAllNews)}
          >
            {showAllNews ? (
              <>
                Mostra meno <i className="bi bi-chevron-compact-up"></i>
              </>
            ) : (
              <>
                Mostra tutto <i className="bi bi-chevron-compact-down"></i>
              </>
            )}
          </p>
        </div>
      </div>
      <section className="position-sticky" style={{ top: "75px", zIndex: 1 }}>
        <div className="section-sidebar-top position-relative p-0 bg-white">
          <p className="position-absolute top-0 end-0 badge rounded-pill bg-secondary-subtle mt-2 me-2 text-secondary">
            Promosso <i className="bi bi-three-dots"></i>
          </p>
          <img
            src="https://png.pngtree.com/background/20230408/original/pngtree-mountain-view-in-the-morning-picture-image_2336856.jpg"
            className="side-img"
          />
          <div className="company-profile-side"></div>
          <div className="d-flex flex-column" style={{ padding: "1em" }}>
            <h6 className="mb-3 mt-3 fw-bold">Nome Azienda</h6>

            <p className="">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <p className="small">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio
              aspernatur vero cumque atque quibusdam
            </p>
            <button className="btn btn-outline-primary btn-sm rounded-pill">
              Segui
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default SidebarHome;
