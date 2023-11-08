import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

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
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                  </Form.Group>
                  <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Submit
                  </Button>
                </Form>
              </Col>
              <Col >
                <Button className='justify-content-center'>
                  Login With Google
                </Button>
              </Col>
            </Row>
          </Container>
        </Card.Body>


      </Card>
    </div>
      
  );
}

export default LoginPage;
