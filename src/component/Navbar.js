import React from "react";
import {
  Navbar,
  Nav,
  Container,
  Dropdown,
  Badge,
  NavDropdown,
} from "react-bootstrap";
import { FaShoppingCart, FaBell, FaBars } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";

const MyNavbar = () => {
  const token = localStorage.getItem("token");
  let role = null;

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      role = decodedToken.role;
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  }

  role = role || "user";
  return (
    <Navbar
      expand="lg"
      bg={role === "admin" ? "light" : "light"}
      variant={role === "admin" ? "light" : "light"}
      className="fixed-top"
    >
      <Container fluid>
        <Navbar.Toggle aria-controls="navbarScroll">
          <FaBars />
        </Navbar.Toggle>
        <Navbar.Brand href="#">
          <img
            src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
            height="15"
            alt="MDB Logo"
            loading="lazy"
          />
        </Navbar.Brand>
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto">
            {role === "admin" ? (
              <>
                <Nav.Link href="#">Admin Dashboard</Nav.Link>
                <Nav.Link href="#">Manage Users</Nav.Link>
                <Nav.Link href="#">Settings</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="#">User Dashboard</Nav.Link>
                <Nav.Link href="#">Dashboard</Nav.Link>
                <Nav.Link href="#">Team</Nav.Link>
                <Nav.Link href="#">Projects</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
        <div className="d-flex align-items-center">
          <Nav.Link href="#">
            <FaShoppingCart className="text-reset me-3" />
          </Nav.Link>
          <Dropdown align="end">
            <Dropdown.Toggle as="a" href="#" className="text-reset me-3">
              <FaBell />
              <Badge bg="danger" pill>
                1
              </Badge>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#">Notifications</Dropdown.Item>
              <Dropdown.Item href="#">Another action</Dropdown.Item>
              <Dropdown.Item href="#">Something else here</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <NavDropdown
            align="end"
            title={
              <img
                src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                className="rounded-circle"
                height="25"
                alt="Avatar"
                loading="lazy"
              />
            }
            id="navbarScrollingDropdown"
          >
            <NavDropdown.Item href="#">My profile</NavDropdown.Item>
            <NavDropdown.Item href="#">Settings</NavDropdown.Item>
            <NavDropdown.Item href="#">Logout</NavDropdown.Item>
          </NavDropdown>
        </div>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
