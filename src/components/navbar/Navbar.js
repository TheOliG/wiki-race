import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import DALE_LOGO from '../../images/DALE_LOGO.jpg' 
import { Button } from 'react-bootstrap';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';


function NavBar() {

    const { user, logOut } = useAuth();

    const navigate = useNavigate();

    return (
      <Navbar expand="sm" className="bg-body-tertiary" data-bs-theme="dark">
        <Container style={{"marginLeft": 0, "marginRight": 0, "maxWidth": "100%"}}>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img
                alt=""
                src={DALE_LOGO}
                width="30"
                height="30"
                className="d-inline-block align-top rounded"
              />{' '}
              Wiki Run
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/"><Nav.Link>Home</Nav.Link></LinkContainer>
              <LinkContainer to="/play"><Nav.Link>Play</Nav.Link></LinkContainer>
            </Nav>
            
            {user ?
              <>
              <Nav style={{"justifyContent": "right"}}>
                <LinkContainer className='mx-3' to={'/profile/' + user?.uid}><Nav.Link>{user?.userName}</Nav.Link></LinkContainer>
              </Nav>
              <Nav style={{"justifyContent": "right"}}>
                <Button className='btn-danger' onClick={()=>{
                  logOut();
                  navigate('/');
                }}>logOut</Button>
              </Nav>
              </>
              :
              <Nav style={{"justifyContent": "right"}}>
                <LinkContainer to="/login"><Nav.Link>Login</Nav.Link></LinkContainer>
              </Nav>
            }
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
  
  export default NavBar;
  