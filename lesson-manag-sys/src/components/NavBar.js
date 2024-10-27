import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import '../App.css'

const NavBar = () => {
  return (
    <Navbar bg="light" data-bs-theme="light" className="navbar-custom">
        <Container>
          <Navbar.Brand href="#home">Actify</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/" className="nav-item">View Offerings</Nav.Link>
            <Nav.Link href="/login" className="nav-item">Log In</Nav.Link>
            <Nav.Link href="/signup" className="nav-item">Register</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  );
};
export default NavBar;