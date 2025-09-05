import { Card, Tab, Tabs, Row, Col } from 'react-bootstrap'
import { BiRightArrowAlt, BiCheck } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import '../css/interests.css'

const Interests = () => {
  const { id } = useParams()
  const { myProfile, otherProfile } = useSelector(
    (state) => state.saveProfileMe
  )

  const profileData = id ? otherProfile : myProfile

  // Utilizzo dati dinamici basati sul profilo corrente
  const interests = profileData
    ? {
        companies: [
          {
            id: 1,
            name: profileData.area
              ? `Tech Company di ${profileData.area.split(',')[0]}`
              : 'Tesla',
            followers: '12.263.567 follower',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png',
            status: 'Già segui',
          },
        ],
        education: [
          {
            id: 1,
            name: profileData.area
              ? `Università di ${profileData.area.split(',')[0]}`
              : 'Università degli Studi di Padova',
            followers: '307.282 follower',
            logo: 'https://seeklogo.com/images/U/universita-degli-studi-di-padova-logo-D71B2107E1-seeklogo.com.png',
            status: 'Aggiungi foto',
          },
        ],
        groups: [
          {
            id: 1,
            name: profileData.title
              ? profileData.title.split(' ')[0]
              : 'JavaScript',
            followers: '1.495.258 utenti',
            logo: 'https://logos-world.net/wp-content/uploads/2023/02/JavaScript-Emblem.png',
            status: 'Già iscritto',
          },
        ],
      }
    : {
        companies: [],
        education: [],
        groups: [],
      }

  return (
    <Card className="border border-1 rounded-4 m-4 position-relative shadow">
      <Card.Body className="border-bottom container">
        <Card.Title>Interessi</Card.Title>
        <div className="mt-4">
          <Tabs
            defaultActiveKey="aziende"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab className="tab-button" eventKey="aziende" title="Aziende">
              <Row>
                {interests.companies.length > 0 ? (
                  interests.companies.map((company) => (
                    <Col key={company.id} className="d-flex">
                      <img
                        src={company.logo}
                        alt="Logo"
                        className="logo-uni me-2 mt-1"
                      />
                      <div>
                        <p className="mb-0 fw-semibold">{company.name}</p>
                        <p className="mb-0">{company.followers}</p>
                        <div className="badge-info border-black py-1 opacity-75 d-flex align-items-center mt-3">
                          <BiCheck className="me-1 fs-4" /> {company.status}
                        </div>
                      </div>
                    </Col>
                  ))
                ) : (
                  <div className="text-muted">
                    <p className="mb-0">Nessuna azienda seguita</p>
                  </div>
                )}
              </Row>
            </Tab>
            <Tab
              className="tab-button"
              eventKey="education"
              title="Scuole o università"
            >
              {interests.education.length > 0 ? (
                interests.education.map((edu) => (
                  <Col key={edu.id} className="d-flex">
                    <img
                      src={edu.logo}
                      alt="Logo"
                      className="logo-uni me-2 mt-1"
                    />
                    <div>
                      <p className="mb-0 fw-semibold">{edu.name}</p>
                      <p className="mb-0">{edu.followers}</p>
                      <div className="badge-info border-black py-1 opacity-75 d-flex align-items-center mt-3">
                        <BiCheck className="me-1 fs-4" /> {edu.status}
                      </div>
                    </div>
                  </Col>
                ))
              ) : (
                <div className="text-muted">
                  <p className="mb-0">Nessuna scuola o università seguita</p>
                </div>
              )}
            </Tab>
            <Tab className="tab-button" eventKey="gruppi" title="Gruppi">
              {interests.groups.length > 0 ? (
                interests.groups.map((group) => (
                  <Col key={group.id} className="d-flex">
                    <img
                      src={group.logo}
                      alt="Logo"
                      className="logo-uni me-2 mt-1"
                    />
                    <div>
                      <p className="mb-0 fw-semibold">{group.name}</p>
                      <p className="mb-0">{group.followers}</p>
                      <div className="badge-info border-black py-1 opacity-75 d-flex align-items-center mt-3">
                        <BiCheck className="me-1 fs-4" /> {group.status}
                      </div>
                    </div>
                  </Col>
                ))
              ) : (
                <div className="text-muted">
                  <p className="mb-0">Nessun gruppo iscritto</p>
                </div>
              )}
            </Tab>
          </Tabs>
        </div>
      </Card.Body>
      <div className="fw-semibold d-flex align-items-center justify-content-center py-1 opacity-75">
        Mostra tutte le aziende
        <BiRightArrowAlt className="ms-1" />
      </div>
    </Card>
  )
}

export default Interests
