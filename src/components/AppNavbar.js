import LogoutButton from '../pages/LogoutButton';
import { AuthContext } from '../context/AuthContext';
import React, { useContext } from 'react';
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import '../css/AppNavbar.css';

const AppNavbar = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <Navbar expand="lg" className="bg-warning bg-gradient text-black fw-semibold">Loading...</Navbar>;
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="navbar">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          Welcome to Jorhee's Blogs
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            {/* Home */}
            <Nav.Link as={NavLink} to="/" className="nav-link" data-tooltip="Home">
              <HomeIcon className="me-2" />
            </Nav.Link>
            {/* Blogs */}
            <Nav.Link as={NavLink} to="/blogs" className="nav-link" data-tooltip="Blogs">
              <MenuBookIcon className="me-2" />
            </Nav.Link>
            {user ? (
              <>
                {/* Add Blog */}
                <Nav.Link as={NavLink} to="/addBlog" className="nav-link" data-tooltip="Add Blog">
                  <AddCircleIcon className="me-2" />
                </Nav.Link>
                {/* Profile */}
                <Nav.Link as={NavLink} to="/profile" className="nav-link" data-tooltip="Profile">
                  <AccountCircleIcon className="me-2" />
                </Nav.Link>
                {/* Logout */}
                <Nav.Item className="nav-link" data-tooltip="Logout">
                  <LogoutButton />
                </Nav.Item>
              </>
            ) : (
              <>
                {/* Login */}
                <Nav.Link as={NavLink} to="/login" className="nav-link" data-tooltip="Login">
                  <LoginIcon className="me-2" />
                </Nav.Link>
                {/* Register */}
                <Nav.Link as={NavLink} to="/register" className="nav-link" data-tooltip="Register">
                  <AppRegistrationIcon className="me-2" />
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
