import { Card, Row, Col } from "react-bootstrap";
import { BiPencil } from "react-icons/bi";
import { useSelector } from "react-redux";

const Info = () => {
  const myInfo = useSelector((state) => {
    console.log("state", state.saveProfileMe.myProfile);
    return state.saveProfileMe.myProfile;
  });

  return (
    <Card className="border border-1 rounded-4 m-4 position-relative">
      <Card.Body className="border-bottom container">
        <Row>
          <Col xs={11}>
            <Card.Title>Informazioni</Card.Title>
            <Card.Text className="mt-4">{myInfo && myInfo.bio}</Card.Text>
          </Col>
          <Col xs={1}>
            <BiPencil className="fs-4 edit" />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Info;
