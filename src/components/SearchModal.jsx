import { Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function SearchModal({
  results,
  searchTerm,
  loading,
  onClose,
  onSelect,
}) {
  const handleItemClick = () => {
    onClose()
    onSelect()
  }

  return (
    <div className="bg-white border rounded-3 shadow-sm p-2">
      {loading && (
        <div className="text-center py-2">
          <Spinner animation="border" size="sm" /> Caricamento...
        </div>
      )}

      {!loading && results.length === 0 && (
        <div className="text-center text-muted py-2">
          Nessun risultato per "{searchTerm}"
        </div>
      )}

      {!loading &&
        results.map((profile) => (
          <Link
            key={profile._id}
            to={`/profile/${profile._id}`}
            className="d-flex align-items-center p-2 text-decoration-none text-dark rounded-2 hover-bg-light"
            onClick={handleItemClick} // Chiamare la nuova funzione
          >
            <img
              src={profile.image}
              alt={profile.name}
              className="rounded-circle me-2"
              width="40"
              height="40"
            />
            <div>
              <div className="fw-semibold">
                {profile.name} {profile.surname}
              </div>
              <div className="small text-muted">{profile.title}</div>
            </div>
          </Link>
        ))}
    </div>
  )
}
