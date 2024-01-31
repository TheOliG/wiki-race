import { Button, Col, Row } from "react-bootstrap";
import JoinPublicGame from "../../components/play/JoinPublicGame";
import { LinkContainer } from "react-router-bootstrap";
import JoinPrivateGame from "../../components/play/JoinPrivateGame";



function PlayGamePage() {
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
            <JoinPrivateGame/>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="m-3 text-center">
          <LinkContainer to="/play/createLobby"><Button className="btn-secondary">Create A New Lobby!</Button></LinkContainer>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default PlayGamePage;
