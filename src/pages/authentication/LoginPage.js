import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

import { useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { logInWithEmail } from '../../firestoreFunctions/authentication/logInWithEmail';
import { useNavigate } from 'react-router-dom';
import { signInWithGoogle } from '../../firestoreFunctions/authentication/signInWithGoogle';
import { Alert } from 'react-bootstrap';

function LoginPage() {

  const [error, setError] = useState("");
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) =>{
    e.preventDefault();
    setLoading(true);
    setError("");
    logInWithEmail(email, password).then(()=>{
      setLoading(false);
      navigate('/');
    }).catch((err)=>{
      setLoading(false);
      setError(err.code);
    });
  }

  const handleGoogleSignIn = async (e) => {
    setLoading(true);
    setError("");
    try {
      await signInWithGoogle();
      setLoading(false);
      navigate("/");
    } catch (err) {
      setLoading(false)
      setError(err.code);
    }
  }

  return (
    <div>
      <Card className='mx-5 my-2 pt-2' data-bs-theme="dark">
        <Card.Title className='text-center'>Login</Card.Title>
        {error !== "" ?
          <Alert key='dangerAlert' variant='danger' className='m-3'>
           {error}
          </Alert>
          :
          <></>
        }
        <Card.Body>
          <Container>
            {loading ?
              <div className='text-center'>
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
              :
              <Row>
                <Col>
                  <Form>
                    <Form.Group className="mb-3" controlId="formEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                      Submit
                    </Button>
                  </Form>
                </Col>
                <Col className='align-self-center mb-5'>
                  <div className='text-center'>
                    <Button className='btn-danger px-5' onClick={handleGoogleSignIn}>
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
            }
          </Container>
        </Card.Body>

        <Card.Footer>Dont Have An Account Yet? Sign Up <LinkContainer to='/signUp'><a href='/'>Here!</a></LinkContainer></Card.Footer>
      </Card>
    </div>
      
  );
}

export default LoginPage;
