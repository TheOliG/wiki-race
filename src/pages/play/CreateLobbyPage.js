import { Alert, Card, Col, Container, Row, Form, Button, InputGroup } from "react-bootstrap";
import { useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import WikiPageSearch from "../../components/play/search/WikiPageSearch";


function CreateLobbyPage() {
  const [error, setError] = useState("");

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
                    <InputGroup>
                      <Form.Control></Form.Control>
                      <Button variant="outline-secondary" onClick={()=>{alert("TODO")}}>
                        Randomise
                      </Button>
                    </InputGroup>
                    <Form.Text>Please enter the URL for the starting page</Form.Text>
                  </Form.Group>
                </Col>  
                <Col>
                  <Form.Group controlId="formTargetPage">
                    <Form.Label>Target Page:</Form.Label>
                    <InputGroup>
                      <WikiPageSearch/>
                      <Button variant="outline-secondary" onClick={()=>{alert("TODO")}} style={{"justify-content":"right"}}>
                        Randomise
                      </Button>
                    </InputGroup>
                    <Form.Text>Please enter the URL for the target page</Form.Text>
                  </Form.Group>
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
