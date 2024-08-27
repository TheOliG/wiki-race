import { Alert, Card, Col, Container, Row, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import WikiPageSearch from "../../components/play/search/WikiPageSearch";
import { createNewLobby } from "../../firestoreFunctions/lobby/createNewLobby";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";


function CreateLobbyPage() {
  const [error, setError] = useState("");
  const [maxPlayers, setMaxPlayers] = useState(5);
  const [timeLimit, setTimeLimit] = useState(120);
  const [startURL, setStartURL] = useState("");
  const [targetURL, setTargetURL] = useState("");
  const [startTitle, setStartTitle] = useState("");
  const [targetTitle, setTargetTitle] = useState("");

  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) =>{
    e.preventDefault();
    if(startURL === "" || targetURL === ""){
      setError("Starting/Target Page Must Be Specified");
    }else if(maxPlayers < 2 || maxPlayers > 15) {
      setError("Max Players Must Be Between 2 and 15");
    }else if(timeLimit < 20 || timeLimit > 600){
      setError("Time Limit Must Be Between 20 and 600 Seconds");
    }
    else{
      createNewLobby({
        startURL: startURL, 
        startTitle: startTitle,
        targetURL: targetURL, 
        targetTitle: targetTitle,
        maxPlayers: maxPlayers, 
        timeLimit: timeLimit},
        String(user.uid)
      ).then((res)=>{
        navigate(`/play/${user.uid}`);
      }).catch((err)=>{
        console.log(err);
        setError(JSON.stringify(err));
      });
    }
    
  };

  return (
    <div>
      <Card className='mx-5 my-2 pt-2' data-bs-theme="dark">
        <Card.Title className='text-center'>Create A New Lobby</Card.Title>
        <Alert key='dangerAlert' variant='danger' className='m-3' hidden={error === ""}>
          {error}
        </Alert>
        <Card.Body>
          <Container>
            <Form>
              <Row>
                <Col>
                  <Form.Group controlId="formStartingPage">
                    <Form.Label>Starting Page:</Form.Label>
                    <WikiPageSearch setURL={setStartURL} setTitle={setStartTitle}/>
                    <Form.Text>Please enter the title of the starting page</Form.Text>
                  </Form.Group>
                  <a href={startURL} target="_blank" rel="noreferrer">{startURL}</a>
                </Col>  
                <Col>
                  <Form.Group controlId="formTargetPage">
                    <Form.Label>Target Page:</Form.Label>
                      <WikiPageSearch setURL={setTargetURL} setTitle={setTargetTitle}/>
                    <Form.Text>Please enter the title of the target page</Form.Text>
                  </Form.Group>
                  <a href={targetURL} target="_blank" rel="noreferrer">{targetURL}</a>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label >Max Players:</Form.Label>
                    <Form.Control type="number" value={maxPlayers} onChange={(e)=>{setMaxPlayers(e.target.value);}}/>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Time Limit (Seconds):</Form.Label>
                    <Form.Control type="number" value={timeLimit} onChange={(e)=>{setTimeLimit(e.target.value);}}/>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col className='text-center mt-3'>
                  <Form.Group>
                    {
                      user ?
                      <Button className="btn-success" onClick={handleSubmit}>Start!</Button>
                      :
                      <div>
                        <small>please login before creating a loby</small>
                        <Button className="btn-secondary" disabled>Start!</Button>
                      </div>
                      
                    }
                    
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Container>
        </Card.Body>

        <Card.Footer>Want To Save Your Progress? Sign Up <LinkContainer to='/signUp'><a href='/'>Here!</a></LinkContainer></Card.Footer>
      </Card>
    </div>
  );
}

export default CreateLobbyPage;
