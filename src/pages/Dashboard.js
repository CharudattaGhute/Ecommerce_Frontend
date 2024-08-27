import React, { useEffect, useState } from "react";
import axios from "axios";
import { ListGroup } from "react-bootstrap";
import {
  FaTachometerAlt,
  FaUsers,
  FaMoneyBill,
  FaCalendar,
  FaChartLine,
  FaUser,
  FaEnvelope,
  FaUserTag,
  FaTimes,
  FaBars,
} from "react-icons/fa";

const Dashboard = () => {
  const [user, setUser] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    async function getUserInfo() {
      try {
        const response = await axios.post(
          "http://localhost:5001/api/users/userinfo",
          {},
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
    if (user.role === "admin") {
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
          <ListGroup.Item action href="#">
            <FaTachometerAlt className="me-3" /> Admin Dashboard
          </ListGroup.Item>
          <ListGroup.Item action href="#">
            <FaUsers className="me-3" /> Manage Users
          </ListGroup.Item>
          <ListGroup.Item action href="#">
            <FaMoneyBill className="me-3" /> Sales
          </ListGroup.Item>
        </>
      );
    } else {
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
          <ListGroup.Item action href="#">
            <FaTachometerAlt className="me-3" /> User Dashboard
          </ListGroup.Item>
          <ListGroup.Item action href="#">
            <FaCalendar className="me-3" /> My Calendar
          </ListGroup.Item>
          <ListGroup.Item action href="#">
            <FaChartLine className="me-3" /> My Analytics
          </ListGroup.Item>
        </>
      );
    }
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="d-flex">
      <div
        className={`bg-light position-relative ${
          sidebarOpen ? "sidebar-open" : "sidebar-closed"
        } p-3`}
        style={{
          minHeight: "100vh",
          width: sidebarOpen ? "250px" : "60px",
          transition: "width 0.3s",
          overflowX: "hidden",
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
      </div>
      <div
        className="flex-grow-1"
        style={{
          marginLeft: sidebarOpen ? "250px" : "60px",
          transition: "margin-left 0.3s",
        }}
      >
        <div className="container mt-5">
          <h2>Welcome to the Dashboard</h2>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
