import { useState } from "react";
import { Alert, Button, Card, CardBody, CardHeader, Col, Form, FormGroup, InputGroup, Row } from "react-bootstrap";
import { getLobbyFromCode } from "../../firestoreFunctions/lobby/getLobbyFromCode";
import { useNavigate } from "react-router-dom";


function JoinPrivateGame() {
  
  const [lobbyCode, setLobbyCode] = useState('');
  const [error, setError] = useState('');


  const navigate = useNavigate();

  return(
    <Card>
      
      <CardHeader>
        Join A Private Lobby
      </CardHeader>
      <CardBody>
        <Alert hidden={error === ''} variant="warning">
          {error}
        </Alert>
        <Row>
          <Col>
            <FormGroup>
              <InputGroup>
                <InputGroup.Text>Lobby Code</InputGroup.Text>
                <Form.Control type="text" value={lobbyCode} onChange={(e)=>{setLobbyCode(e.target.value)}}/>
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button className="btn-success my-2" onClick={(e)=>{
              getLobbyFromCode(lobbyCode.toUpperCase()).then((result)=>{
                if(result === ''){
                  setError('Lobby Does Not Exist');
                }
                else{
                  navigate(`/play/${result}`);
                }
              }).catch((err)=>{
                setError('Error Connecting To Server');
              })
            }}>Join Now!</Button>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
}

export default JoinPrivateGame;