import { useState } from 'react'
// import FooterHome from './Footer/FooterHome';

function SidebarHome() {
  const [showAllNews, setShowAllNews] = useState(false)

  const news = [
    {
      id: 1,
      title: "Il falso mito dell'impatto zero",
      published: '3 ore fa',
      readers: '585 lettori',
    },
    {
      id: 2,
      title: 'Quanto vale la cucina italiana',
      published: '3 giorni fa',
      readers: '452 lettori',
    },
    {
      id: 3,
      title: 'Il primo semestre di Iliad',
      published: '4 giorni fa',
      readers: '349 lettori',
    },
    {
      id: 4,
      title: 'Mediaset conquista la tedesca Prosieben',
      published: '10 ore fa',
      readers: '264 lettori',
    },
    {
      id: 5,
      title: "McDonald's investe sull'Italia",
      published: '3 giorni fa',
      readers: '174 lettori',
    },
  ]

  return (
    <>
      <div className="card mb-3 shadow-sm mt-5">
        <div className="card-body">
          <div>
            <h5 className="fw-bold">LinkedIn Notizie</h5>
          </div>
          <div>
            <h6 className="text-muted fw-bold">Storie Principali</h6>
          </div>
          <div>
            <p className="mb-0 fw-bold">Venezia 82: racconti dal Lido</p>
            <p className="fw-6 text-muted">4 giorni fa &bull; 1.869 lettori</p>
          </div>
          <div>
            <p className="mb-0 fw-bold">Greenpeace Italia cambia guida</p>
            <p className="fw-6 text-muted">3 ore fa</p>
          </div>
          <div>
            <p className="mb-0 fw-bold">Si (ri)parla di caro scuola</p>
            <p className="fw-6 text-muted">25 minuti fa</p>
          </div>
          <div>
            <p className="mb-0 fw-bold">Smart working e lavoro femminile</p>
            <p className="fw-6 text-muted">3 giorni fa &bull; 1.394 lettori</p>
          </div>
          <div>
            <p className="mb-0 fw-bold">Fame di data center</p>
            <p className="fw-6 text-muted">5 giorni fa &bull; 698 lettori</p>
          </div>

          {showAllNews && (
            <>
              {news.map((text) => (
                <div key={text.id}>
                  <p className="mb-0 fw-bold">{text.title}</p>
                  <p className="fw-6 text-muted">
                    {text.published} &bull; {text.readers}
                  </p>
                </div>
              ))}
            </>
          )}
          <p
            className="mb-0 fw-semibold"
            style={{ cursor: 'pointer' }}
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
      {/* <FooterHome /> */}
    </>
  )
}

export default SidebarHome
