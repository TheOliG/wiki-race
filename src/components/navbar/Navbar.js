import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import DALE_LOGO from '../../images/DALE_LOGO.jpg' 


function NavBar() {
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
              <LinkContainer to="/test"><Nav.Link>Test</Nav.Link></LinkContainer>
            </Nav>
            <Nav style={{"justifyContent": "right"}}>
              <LinkContainer to="/login"><Nav.Link>Login</Nav.Link></LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
  
  export default NavBar;
  