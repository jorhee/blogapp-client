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
        <Navbar.Brand as={NavLink} to="/">
          Welcome to Jorhee's Blogs
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            {/* Home */}
            <Nav.Link
              as={NavLink}
              to="/"
              className="nav-link"
            >
              <HomeIcon className="me-2" /> Home
            </Nav.Link>
            {/* Blogs */}
            <Nav.Link
              as={NavLink}
              to="/blogs"
              className="nav-link"
            >
              <MenuBookIcon className="me-2" /> Blogs
            </Nav.Link>
            {/* Conditional Rendering for Logged-in User */}
            {user ? (
              <>
                {/* Add Blog */}
                <Nav.Link
                  as={NavLink}
                  to="/addBlog"
                  className="nav-link"
                >
                  <AddCircleIcon className="me-2" /> Add Blog
                </Nav.Link>
                {/* Profile */}
                <Nav.Link
                  as={NavLink}
                  to="/profile"
                  className="nav-link"
                >
                  <AccountCircleIcon className="me-2" /> Profile
                </Nav.Link>
                {/* Logout */}
                <LogoutButton />
              </>
            ) : (
              <>
                {/* Login */}
                <Nav.Link
                  as={NavLink}
                  to="/login"
                  className="nav-link"
                >
                  <LoginIcon className="me-2" /> Login
                </Nav.Link>
                {/* Register */}
                <Nav.Link
                  as={NavLink}
                  to="/register"
                  className="nav-link"
                >
                  <AppRegistrationIcon className="me-2" /> Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
