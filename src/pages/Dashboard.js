import React, { useEffect, useState } from "react";
import axios from "axios";
import { ListGroup, Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {
  FaUser,
  FaEnvelope,
  FaUserTag,
  FaTimes,
  FaBars,
  FaBoxOpen,
  FaCartPlus,
  FaPlusCircle,
  FaTags,
} from "react-icons/fa";
import { Routes, Route, Link } from "react-router-dom";
import Addcategory from "../component/category/Addcategory";
import Addproduct from "../component/products/Addproduct";
import Cart from "../component/cart/Cart";
import Cartshow from "../component/user/Carthshow";
import UpdateCategory from "../component/category/updatecategory";
import Productmodify from "../component/products/Productmodify";

const Dashboard = () => {
  const [user, setUser] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
          <ul className="list-unstyled">
            <li className="mb-3">
              <Link to={"Products"}>
                <Button variant="outline-success" className="w-100">
                  <FaBoxOpen className="me-2" />
                  Products
                </Button>
              </Link>
            </li>
            {user.role === "admin" ? (
              <>
                <li className="mb-3">
                  <Link to={"addproduts"}>
                    <Button variant="outline-success" className="w-100">
                      <FaPlusCircle className="me-2" />
                      Add Products
                    </Button>
                  </Link>
                </li>
                <li className="mb-3">
                  <Link to={"addcategory"}>
                    <Button variant="outline-success" className="w-100">
                      <FaTags className="me-2" />
                      Add Category
                    </Button>
                  </Link>
                </li>
                <li className="mb-3">
                  <Link to={"cart"}>
                    <Button variant="outline-success" className="w-100">
                      <FaCartPlus className="me-2" />
                      Cart
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link to={"Category"}>
                    <Button variant="outline-success" className="w-100">
                      <FaTags className="me-2" />
                      Category
                    </Button>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="mb-3">
                  <Link to={"userproducts"}>
                    <Button variant="outline-success" className="w-100">
                      <FaCartPlus className="me-2" />
                      Product Cart
                    </Button>
                  </Link>
                </li>
                <li className="mb-3">
                  <Link to={"cart"}>
                    <Button variant="outline-success" className="w-100">
                      <FaCartPlus className="me-2" />
                      Cart
                    </Button>
                  </Link>
                </li>
              </>
            )}
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
            boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
          }}
        >
          {sidebarOpen && (
            <button
              onClick={handleSidebarToggle}
              className="btn btn-light position-absolute top-0 end-0 mt-3 me-3"
              style={{
                zIndex: 1,
                padding: "8px 12px",
                fontSize: "1.2rem",
              }}
            >
              <FaTimes />
            </button>
          )}
          {!sidebarOpen && (
            <button
              onClick={handleSidebarToggle}
              className="btn btn-light position-absolute top-0 start-0 mt-3 ms-3"
              style={{
                zIndex: 1,
                padding: "8px 12px",
                fontSize: "1.2rem",
              }}
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
            marginLeft: sidebarOpen ? "100px" : "15px",
            transition: "margin-left 0.3s",
            padding: "20px",
          }}
        >
          <Routes>
            <Route path="Products" element={<Productmodify />} />
            <Route path="Category" element={<UpdateCategory />} />
            <Route path="userproducts" element={<Cartshow />} />

            {user.role === "admin" ? (
              <>
                <Route path="addproduts" element={<Addproduct />} />
                <Route path="addcategory" element={<Addcategory />} />
                <Route path="cart" element={<h1>Cart</h1>} />
              </>
            ) : (
              <Route path="cart" element={<h1>Cart</h1>} />
            )}

            <Route
              path="/"
              element={
                <h1 style={{ textAlign: "center" }}>Welcome to Dashboard</h1>
              }
            />
          </Routes>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
