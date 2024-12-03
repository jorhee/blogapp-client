import { NavLink } from 'react-router-dom';
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Home, Movie, AddCircle } from '@mui/icons-material'; // Material UI icons
import LogoutButton from '../pages/LogoutButton';
import '../css/AppNavbar.css'

const AppNavbar = () => {

  const { user, loading } = useContext(AuthContext);  // Extract loading state

    // Display a loading indicator until user data is fetched
    if (loading) {
        return <Navbar expand="lg" className="bg-warning bg-gradient text-black fw-semibold">Loading...</Navbar>;
    }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="navbar">
      <Container>
        <Navbar.Brand as={NavLink} to="/">Welcome to Jorhee's Blogs</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/"><Home />Home</Nav.Link>
            <Nav.Link as={NavLink} to="/blogs"><Movie />Blogs</Nav.Link>
              {user ? (
                      <>
                          <Nav.Link as={NavLink} to="/add-blog"><AddCircle /> Add Blog</Nav.Link>
                          <Nav.Link as={NavLink} to="/profile" exact="true">Profile</Nav.Link>
                          <LogoutButton />
                      </>
                  ) : (
                  <>
                      <Nav.Link as={NavLink} to="/login" exact="true" className="bg-gray bg-gradient text-white fw-bold rounded px-4 me-2">Login</Nav.Link>
                      <Nav.Link as={NavLink} to="/register" exact="true" className="text-white fw-bold bg-gray bg-gradient rounded px-4">Register</Nav.Link>
                  </>
              )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
