import React, { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  Container,
  Dropdown,
  Badge,
  NavDropdown,
  Button,
} from "react-bootstrap";
import { FaShoppingCart, FaBell, FaBars } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import cartshow from "../component/user/Carthshow";

const MyNavbar = ({ onToggleSidebar, cartCount }) => {
  const [role, setRole] = useState("user");
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setRole(decodedToken.role);
      } catch (error) {
        console.error("Failed to decode token:", error);
        setRole("user");
      }
    }
  }, [localStorage.getItem("token")]);

  const handleLogoClick = () => {
    navigate("/dashboard");
  };

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setUser(null);
  };
  const handlecart = () => [navigate("/cart")];

  return (
    <Navbar
      expand="lg"
      bg="dark"
      variant="dark"
      className="py-3 shadow-sm"
      style={{
        background: "linear-gradient(90deg, #00c6ff, #0072ff)",
      }}
    >
      <Container fluid>
        <Navbar.Toggle aria-controls="navbarScroll">
          <FaBars
            onClick={onToggleSidebar}
            style={{ color: "#fff", cursor: "pointer" }}
          />
        </Navbar.Toggle>

        <Navbar.Brand
          href="#"
          onClick={handleLogoClick}
          className="d-flex align-items-center"
        >
          <img
            src="https://c4.wallpaperflare.com/wallpaper/185/41/185/smoke-gas-letter-litera-wallpaper-preview.jpg"
            height="40"
            alt="MDB Logo"
            loading="lazy"
            className="rounded-circle"
            style={{ marginRight: "10px" }}
          />
          <span className="text-white">WatchSphere</span>
        </Navbar.Brand>

        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto">
            {role === "admin" ? (
              <>
                <Nav.Link href="#" className="text-white">
                  Admin Dashboard
                </Nav.Link>
                <Nav.Link href="#" className="text-white">
                  Manage Users
                </Nav.Link>
                <Nav.Link href="#" className="text-white">
                  Settings
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="#" className="text-white">
                  Services
                </Nav.Link>
                <Nav.Link href="#" className="text-white">
                  Contact
                </Nav.Link>
              </>
            )}
          </Nav>

          <Button variant="outline-light" onClick={logout} className="me-3">
            LOGOUT
          </Button>
        </Navbar.Collapse>

        <div className="d-flex align-items-center">
          <Nav.Link href="#">
            <FaShoppingCart
              className="text-white me-3"
              style={{ fontSize: "1.5rem" }}
              onClick={handlecart}
            />
          </Nav.Link>

          <Dropdown align="end">
            <Dropdown.Toggle as="a" href="#" className="text-white">
              <FaBell style={{ fontSize: "1.5rem", color: "#fff" }} />
              <Badge bg="danger" pill className="ms-2">
                1
              </Badge>
            </Dropdown.Toggle>
            <Dropdown.Menu align="end">
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
            className="ms-3"
          >
            <NavDropdown.Item href="#">My profile</NavDropdown.Item>
            <NavDropdown.Item href="#">Settings</NavDropdown.Item>
            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </div>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
