import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavBar = () => {
  const { role, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/home');
  };

  return (
    <Navbar bg="light" data-bs-theme="light" className="navbar-custom">
      <Container>
        <Navbar.Brand href="/home">Actify</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/offerings" className="nav-item">View Offerings</Nav.Link>
          {role ? (
            <>
              <Nav.Link href="/account" className="nav-item">My Account</Nav.Link>
              {role === 'ADMIN' && ( // If user is admin
                <Nav.Link href="/admindash" className="nav-item">Admin Dashboard</Nav.Link>
              )}
              {role === 'INSTRUCTOR' && (
                <Nav.Link href="/instructordash" className="nav-item">Instructor Dashboard</Nav.Link>
              )}
              <Nav.Link onClick={handleLogout} className="nav-item">Log Out</Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link href="/login" className="nav-item">Log In</Nav.Link>
              <Nav.Link href="/signup" className="nav-item">Register</Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;