import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { signUpWithEmail } from '../../firestoreFunctions/authentication/signUpWithEmail';
import { useNavigate } from 'react-router-dom';

function SignUpPage() {

  const [userName, setUsername] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const navigate = useNavigate();


  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,30}$/;
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const userNameRegex = /^\w{1,15}$/

  const handleSubmit = (e) =>{
    e.preventDefault();
    if(!userName.match(userNameRegex)){
      alert("Username must be between 1 and 15 characters and only have letters, numbers and underscores");
    }
    else if(!email.match(emailRegex)){
      alert("Email must be in the correct format");
    }
    else if(!password.match(passwordRegex)){
      alert("Password must be between 6-30 characters, have one number, one uppercase and lowercase letter");
    }
    else if(password !== passwordConfirmation){
      alert("Passwords do not match");
    }
    else{
      signUpWithEmail(email, password, userName).then(()=>navigate('/')).catch((err) => {
        alert(JSON.stringify(err));
      });
    }

  }

  return (
    <div>
      <Card className='mx-5 my-2 pt-2' data-bs-theme="dark">
        <Card.Title className='text-center'>Sign Up</Card.Title>

        <Card.Body>
          <Container>
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
                  <Button className='btn-danger px-5'>
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
          </Container>
        </Card.Body>

        <Card.Footer>Already Have An Account? Login <LinkContainer to='/login'><a href='/'>Here!</a></LinkContainer></Card.Footer>
      </Card>
    </div>
      
  );
}

export default SignUpPage;
