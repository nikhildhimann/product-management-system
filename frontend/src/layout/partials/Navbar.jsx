import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { FaBars } from "react-icons/fa";

export default function CustomNavbar({ toggleSidebar }) {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <Container fluid>
        {user && (
          <button
            className="btn btn-outline-primary me-3 d-lg-none"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <FaBars />
          </button>
        )}
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          System
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" end>
              Home
            </Nav.Link>
            {user ? (
              <>
                <Nav.Link as={NavLink} to="/dashboard">
                  Dashboard
                </Nav.Link>
                <NavDropdown
                  title={
                    <>
                      <img
                        src={user.image || "/dp.jpg"}
                        alt={user.name}
                        className="rounded-circle me-2"
                        style={{ width: "30px", height: "30px" }}
                      />
                      {user.name}
                    </>
                  }
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item as={Link} to="/dashboard/profile">
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/dashboard/products">
                    Products
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutUser}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}