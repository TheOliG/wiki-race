import { Alert, Card, Col, Container, Row, Form, Button, InputGroup, FormGroup } from "react-bootstrap";
import { useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import WikiPageSearch from "../../components/play/search/WikiPageSearch";


function CreateLobbyPage() {
  const [error, setError] = useState("");
  const [startURL, setStartURL] = useState("");
  const [targetURL, setTargetURL] = useState("");

  return (
    <div>
      <Card className='mx-5 my-2 pt-2' data-bs-theme="dark">
        <Card.Title className='text-center'>Create A New Lobby</Card.Title>
        {error !== "" ?
          <Alert key='dangerAlert' variant='danger' className='m-3'>
           {error}
          </Alert>
          :
          <></>
        }
        <Card.Body>
          <Container>
            <Form>
              <Row>
                <Col>
                  <Form.Group controlId="formStartingPage">
                    <Form.Label>Starting Page:</Form.Label>
                    <WikiPageSearch setURL={setStartURL}/>
                    <Form.Text>Please enter the title of the starting page</Form.Text>
                  </Form.Group>
                  <a href={startURL} target="_blank" rel="noreferrer">{startURL}</a>
                </Col>  
                <Col>
                  <Form.Group controlId="formTargetPage">
                    <Form.Label>Target Page:</Form.Label>
                      <WikiPageSearch setURL={setTargetURL}/>
                    <Form.Text>Please enter the title of the target page</Form.Text>
                  </Form.Group>
                  <a href={targetURL} target="_blank" rel="noreferrer">{targetURL}</a>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Form.Label>Max Players:</Form.Label>
                    <Form.Control type="number"/>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </Container>
        </Card.Body>

        <Card.Footer>Dont Have An Account Yet? Sign Up <LinkContainer to='/signUp'><a href='/'>Here!</a></LinkContainer></Card.Footer>
      </Card>
    </div>
  );
}

export default CreateLobbyPage;
