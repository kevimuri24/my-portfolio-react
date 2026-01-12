import { useState, useEffect } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import logo from '../assets/img/logo.svg';
import navIcon1 from '../assets/img/nav-icon1.svg';
import navIcon2 from '../assets/img/nav-icon2.svg';
import navIcon3 from '../assets/img/nav-icon3.svg';


export const NavBar = () => {
  const [ activelink, setActiveLink ] = useState('home');
  const [ scrolled, setScrolled ] = useState(false);

  useEffect( () => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
  
    }

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [])

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  }

  return (
    <Navbar expand="lg" className={scrolled ? "scrolled" : ""}>
      <Container>
        <Navbar.Brand href="#home">
            <img src={logo} alt ="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <span className='navbar-toggler-icon'></span>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home" className={activelink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick = { () => onUpdateActiveLink('home')}>Home</Nav.Link>
            <Nav.Link href="#skills" className={activelink === 'skills' ? 'active navbar-link' : 'navbar-link'} onClick = { () => onUpdateActiveLink('skills')}>Skills</Nav.Link>
            <Nav.Link href="#projects" className={activelink === 'projects' ? 'active navbar-link' : 'navbar-link'} onClick = { () => onUpdateActiveLink('projects')}>Projects</Nav.Link>
          </Nav>
          <span className='navbar-text'>
            <div className='social-icon'>
                <a href='#'><img src={navIcon1} alt="GitHub" /></a>
                <a href='#'><img src={navIcon2} alt="Facebook" /></a>
                <a href='#'><img src={navIcon3} alt="Instagram" /></a>
            </div>
            <button className='vvd' onClick={() => console.log('connect') }><span>Let’s Connect</span></button>
          </span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
}