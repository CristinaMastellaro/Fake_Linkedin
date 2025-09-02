import { Card, Row, Col, Carousel } from 'react-bootstrap'
import '../css/hero.css'
import { BiCheckShield, BiPencil, BiX, BiSolidCamera } from 'react-icons/bi'
import { useSelector } from 'react-redux'

const Hero = () => {
  const myInfo = useSelector((state) => {
    console.log('state', state.saveProfileMe.myProfile)
    return state.saveProfileMe.myProfile
  })

  return (
    <Card className="border border-1 rounded-4 m-4 position-relative">
      <Card.Img
        variant="top"
        src="https://png.pngtree.com/background/20230408/original/pngtree-mountain-view-in-the-morning-picture-image_2336856.jpg"
        className="hero-img"
      />
      <div className="picture-profile">
        <img src={myInfo && myInfo.image} alt="Picture profile" />
      </div>
      <div className="picture-photocamera">
        <BiSolidCamera />
      </div>
      <Card.Body className="container-fluid mt-5">
        <Row>
          <Col xs={12} md={6}>
            <Card.Title>
              {myInfo && myInfo.name + ' ' + myInfo.surname}
            </Card.Title>
            <div className="badge-verifica rounded-4 px-3 d-flex align-items-center">
              <BiCheckShield className="fs-5 me-1" /> Aggiungi badge di verifica
            </div>
            <Card.Text className="mb-0">{myInfo && myInfo.title}</Card.Text>
            <p className="d-md-none my-0 opacity-75 small">
              Università degli studi di Padova
            </p>
            <div className="d-flex gap-1 my-1 flex-wrap">
              <p className="my-0 opacity-75 small">{myInfo && myInfo.area}</p>
              <p className="my-0 ">·</p>
              <p className="my-0 myBlue small">Informazioni di contatto</p>
            </div>
            <p className="my-0 myBlue small">3 collegamenti</p>
          </Col>
          <Col
            xs={6}
            lg={6}
            className="d-flex gap-2 d-none d-md-block justify-content-end"
          >
            <img
              src="https://seeklogo.com/images/U/universita-degli-studi-di-padova-logo-D71B2107E1-seeklogo.com.png"
              alt="Logo uni"
              className="logo-uni"
            />
            <span className="fw-semibold ms-1">
              Università degli Studi di Padova
            </span>
          </Col>
        </Row>
        <div className="mt-3 d-flex flex-wrap gap-2">
          <div className="badge-info badge-active">Disponibile per</div>
          <div className="badge-info myBlue">Aggiungi sezione del profilo</div>
          <div className="badge-info myBlue">Migliora profilo</div>
          <div className="badge-info border-black">Risorse</div>
        </div>
        <Carousel data-bs-theme="dark" className="d-sm-none">
          <Carousel.Item interval={120000}>
            <img
              className="d-block w-100 carousel-img-info"
              src="https://t3.ftcdn.net/jpg/03/53/11/00/360_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg"
              alt="First slide"
            />
            <Carousel.Caption className="container border p-3 rounded-3 border-opacity-25 first-item-carousel carousel-info">
              <div>
                <Row>
                  <Col xs={11}>
                    <p className="mb-0 fw-semibold">Disponibile a lavorare</p>
                  </Col>
                  <Col xs={1}>
                    <div>
                      <BiPencil className="img-carousel" />
                    </div>
                  </Col>
                </Row>
                <p className="mb-0">Ruoli di Laureato</p>
                <p className="myBlue mb-0">Mostra dettagli</p>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={120000}>
            <img
              className="d-block w-100 carousel-img-info"
              src="https://t3.ftcdn.net/jpg/03/53/11/00/360_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg"
              alt="Second slide"
            />
            <Carousel.Caption className="container border p-3 rounded-3 border-opacity-25 carousel-info">
              <Row>
                <Col xs={11}>
                  <div>
                    <span className="fw-semibold">
                      Metti in risalto i tuoi servizi
                    </span>{' '}
                    in un'apposita sezione sul tuo profilo, così sarà più facile
                    trovarti.
                  </div>
                  <p className="myBlue mb-0">Inizia</p>
                </Col>
                <Col xs={1}>
                  <BiX className="img-carousel" />
                </Col>
              </Row>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <Row className="mt-3 d-none d-sm-flex">
          <Col className="myCarousel first-item-carousel small border border-opacity-10">
            <div>
              <Row>
                <Col xs={11}>
                  <p className="mb-0 fw-semibold">Disponibile a lavorare</p>
                </Col>
                <Col xs={1}>
                  <div>
                    <BiPencil className="img-carousel" />
                  </div>
                </Col>
              </Row>
              <p className="mb-0">Ruoli di Laureato</p>
              <p className="myBlue mb-0">Mostra dettagli</p>
            </div>
          </Col>
          <Col className="myCarousel small">
            <Row>
              <Col xs={11}>
                <div>
                  <span className="fw-semibold">
                    Metti in risalto i tuoi servizi
                  </span>{' '}
                  in un'apposita sezione sul tuo profilo, così sarà più facile
                  trovarti.
                </div>
                <p className="myBlue mb-0">Inizia</p>
              </Col>
              <Col xs={1}>
                <BiX className="img-carousel" />
              </Col>
            </Row>
          </Col>
        </Row>
        {/* <Button variant="primary">Go somewhere</Button> */}
      </Card.Body>
    </Card>
  )
}

export default Hero
