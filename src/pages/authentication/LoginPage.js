import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function LoginPage() {

  const [email, setEmail] = useState(""); 

  const handleSubmit = (e) =>{
    e.preventDefault();
    alert(email);
  }

  return (
    <div>
      <Card className='mx-5 my-2 pt-2' data-bs-theme="dark">
        <Card.Title className='text-center'>Login</Card.Title>

        <Card.Body>
          <Container>
            <Row>
              <Col>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"/>
                  </Form.Group>
                  <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Submit
                  </Button>
                </Form>
              </Col>
              <Col className='align-self-center mb-5'>
                <div className='text-center'>
                  <Button className='btn-danger px-5'>
                    <img 
                      width="23"
                      height="23"
                      alt='Google Logo'
                      src='https://cdn-icons-png.flaticon.com/256/2875/2875331.png'
                    /> {' '}
                    Login With Google
                  </Button>
                </div>
                
              </Col>
            </Row>
          </Container>
        </Card.Body>

        <Card.Footer>Dont Have An Account Yet? Sign Up <LinkContainer to='/signUp'><a href='/'>Here!</a></LinkContainer></Card.Footer>
      </Card>
    </div>
      
  );
}

export default LoginPage;
