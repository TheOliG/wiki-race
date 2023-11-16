import { Button, Card, CardBody, CardHeader, Col, Row } from "react-bootstrap";
import Countdown from "react-countdown";


function JoinPublicGame() {
  

  return(
    <Card>
      <CardHeader>
        Join The Public Lobby!
      </CardHeader>
      <CardBody>
        <Row>
          <Col>
            Current Game:
          </Col>
          <Col>
            # Of People:
          </Col>
          <Col>
            Time Left:
          </Col>
        </Row>
        <Row>
          <Col>
            {`Test ---> Testing`}
          </Col>
          <Col>
            {'14'}
          </Col>
          <Col>
            <Countdown date={Date.now() + 1000000} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button className="btn-success my-2">Join Now!</Button>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
}

export default JoinPublicGame;