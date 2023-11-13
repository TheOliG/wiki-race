import { Col, Row } from "react-bootstrap";
import JoinPublicGame from "../../components/play/JoinPublicGame";



function PlayGame() {
  return (
    <div>
      <Row>
        <Col>
          <div className="m-3 text-center">
            <JoinPublicGame/>
          </div>
        </Col>
        <Col>
          <div className="m-3 text-center">
            <JoinPublicGame/>
          </div>
        </Col>
      </Row>
      <Row>
        <div className="m-3 text-center">
          <JoinPublicGame/>
        </div>
      </Row>
    </div>
  );
}

export default PlayGame;
