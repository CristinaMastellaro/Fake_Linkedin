import { Card, Row, Col } from "react-bootstrap";
import { BiPencil } from "react-icons/bi";

const Info = () => {
  return (
    <Card className="border border-1 rounded-4 m-4 position-relative">
      <Card.Body className="border-bottom container">
        <Row>
          <Col xs={11}>
            <Card.Title>Informazioni</Card.Title>
            <Card.Text className="mt-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. In quam
              dignissimos ea suscipit quasi alias neque ipsum minus pariatur
              sequi harum quaerat natus voluptate repellat magni, architecto
              quod officiis impedit.
            </Card.Text>
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
