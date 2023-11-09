import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';

import { useState } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { signUpWithEmail } from '../../firestoreFunctions/authentication/signUpWithEmail';
import { useNavigate } from 'react-router-dom';
import { signInWithGoogle } from '../../firestoreFunctions/authentication/signInWithGoogle';

function SignUpPage() {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 
  const [userName, setUsername] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const navigate = useNavigate();

  // REGEX
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,30}$/;
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const userNameRegex = /^\w{1,15}$/

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


  const handleSubmit = (e) =>{
    e.preventDefault();

    // Validating that the fields are correct
    if(!userName.match(userNameRegex)){
      setError("Username must be between 1 and 15 characters and only have letters, numbers and underscores");
    }
    else if(!email.match(emailRegex)){
      setError("Email must be in the correct format");
    }
    else if(!password.match(passwordRegex)){
      setError("Password must be between 6-30 characters, have one number, one uppercase and lowercase letter");
    }
    else if(password !== passwordConfirmation){
      setError("Passwords do not match");
    }
    else{
      setLoading(true);
      setError("");
      signUpWithEmail(email, password, userName).then(()=>{
        setLoading(false);
        navigate('/');
      }).catch((err) => {
        setLoading(false);
        setError(err.code);
      });
    }

  }

  return (
    <div>
      <Card className='mx-5 my-2 pt-2' data-bs-theme="dark">
        <Card.Title className='text-center'>Sign Up</Card.Title>
        {error !== "" ?
          <Alert key='dangerAlert' variant='danger' className='m-3'>
           {error}
          </Alert>
          :
          <></>
        }
        
        <Card.Body className='mh-5'>
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
                  <Form.Group className="mb-3" controlId="formUsername">
                      <Form.Label>Username</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="Enter Username" 
                        isInvalid={userName !== "" && !userName.match(userNameRegex)}
                        isValid={userName !== "" && userName.match(userNameRegex)}
                        value={userName} 
                        onChange={(e)=>{setUsername(e.target.value)}}/>
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="formEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control 
                        type="email" 
                        placeholder="Enter email" 
                        isInvalid={email !== "" && !email.match(emailRegex)}
                        isValid={email !== "" && email.match(emailRegex)}
                        value={email} 
                        onChange={(e)=>{setEmail(e.target.value)}}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control 
                      type="password" 
                      placeholder="Password" 
                      isInvalid={password !== "" && !password.match(passwordRegex)}
                      isValid={password.match(passwordRegex)}
                      value={password} 
                      onChange={(e)=>{setPassword(e.target.value)}}/>
                      <Form.Control.Feedback type="invalid">
                        Password must be longer than 6 characters, have one number, one uppercase and lowercase letter
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPasswordConfirmation">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control 
                        type="password" 
                        placeholder="Password"
                        isInvalid={passwordConfirmation !== "" && passwordConfirmation !== password}
                        isValid={passwordConfirmation !== "" && passwordConfirmation === password} 
                        value={passwordConfirmation} 
                        onChange={(e)=>{setPasswordConfirmation(e.target.value)}}
                      />
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
                      Sign Up With Google
                    </Button>
                  </div>
                  
                </Col>
              </Row>
            }
          </Container>
        </Card.Body>

        <Card.Footer>Already Have An Account? Login <LinkContainer to='/login'><a href='/'>Here!</a></LinkContainer></Card.Footer>
      </Card>
    </div>
      
  );
}

export default SignUpPage;
