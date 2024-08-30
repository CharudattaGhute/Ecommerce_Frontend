import React, { useEffect, useState } from "react";
import axios from "axios";
import { ListGroup, Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { FaUser, FaEnvelope, FaUserTag, FaTimes, FaBars } from "react-icons/fa";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Addcategory from "../component/category/Addcategory";
import Addproduct from "../component/products/Addproduct";
import Cart from "../component/cart/Cart";

const Dashboard = () => {
  const [user, setUser] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getUserInfo() {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/users/userinfo",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        setUser(response.data.user);
      } catch (error) {
        console.log(error);
      }
    }
    getUserInfo();
  }, []);

  const renderSidebarItems = () => {
    return (
      <>
        <div className="container mb-4">
          <FaUserTag className="me-3" /> {user.role}
        </div>
        <div className="container mb-4">
          <FaEnvelope className="me-3" /> {user.email}
        </div>
        <div className="container mb-4">
          <FaUser className="me-3" /> {user.username}
        </div>
        <hr />
        <div className="container">
          <ul>
            <Link to={"Products"}>
              <Button variant="outline-success">Products</Button>
            </Link>
            <hr></hr>
            {user.role === "admin" && (
              <>
                <Link to={"addproduts"}>
                  <Button variant="outline-success">Add Products</Button>
                </Link>
                <hr></hr>
                <Link to={"addcategory"}>
                  <Button variant="outline-success">Add Category</Button>
                </Link>
                <hr></hr>
              </>
            )}
            <Link to={"Category"}>
              <Button variant="outline-success">Category</Button>
            </Link>
            <hr></hr>
            <Link to={"cart"}>
              <Button variant="outline-success">Cart</Button>
            </Link>
          </ul>
        </div>
      </>
    );
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Container fluid className="d-flex p-0">
      <Row className="flex-nowrap w-100">
        <Col
          xs={sidebarOpen ? 8 : 2}
          sm={sidebarOpen ? 4 : 2}
          md={sidebarOpen ? 3 : 1}
          className={`bg-light p-3 ${
            sidebarOpen ? "sidebar-open" : "sidebar-closed"
          }`}
          style={{
            minHeight: "100vh",
            transition: "width 0.3s",
            overflowX: "hidden",
            position: "relative",
          }}
        >
          {sidebarOpen && (
            <button
              onClick={handleSidebarToggle}
              className="btn btn-light position-absolute top-0 end-0 mt-3 me-3"
              style={{ zIndex: 1 }}
            >
              <FaTimes />
            </button>
          )}
          {!sidebarOpen && (
            <button
              onClick={handleSidebarToggle}
              className="btn btn-light position-absolute top-0 start-0 mt-3 ms-3"
              style={{ zIndex: 1 }}
            >
              <FaBars />
            </button>
          )}
          {sidebarOpen && (
            <ListGroup variant="flush">{renderSidebarItems()}</ListGroup>
          )}
        </Col>
        <Col
          className="flex-grow-1"
          style={{
            marginLeft: sidebarOpen ? "250px" : "15px",
            transition: "margin-left 0.3s",
          }}
        >
          <Routes>
            <Route path="Products" element={<h1>Products</h1>} />
            <Route path="Category" element={<h1>Category</h1>} />
            <Route path="cart" element={<Cart />} />
            <Route path="addproduts" element={<Addproduct />} />
            <Route path="addcategory" element={<Addcategory />} />
            <Route
              path="/"
              element={
                <h1 style={{ marginRight: "500px" }}>Welcome to Dashboard</h1>
              }
            />
          </Routes>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
