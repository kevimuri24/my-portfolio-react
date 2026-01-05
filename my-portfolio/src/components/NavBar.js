import { useState } from 'react';
import { NavBar, Container } from 'react-bootstrap';

export const NavBar = () => {
  const [activelink, setActiveLink] = useState('home');
    return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">
            <img src={''} alt ="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <span className='navbar-toggler-icon'></span>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#skills">Skills</Nav.Link>
            <Nav.Link href="#projects">Projects</Nav.Link>
          </Nav>
          <span className='navbar-text'>
            <div className='social-icon'>
                <a href='#'><img src={''} alt="GitHub" /></a>
                <a href='#'><img src={''} alt="LinkedIn" /></a>
                <a href='#'><img src={''} alt="X" /></a>
            </div>
            <button className='vvd' onClick={() => console.log('connect') }><span>Let’s Connect</span></button>
          </span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
}