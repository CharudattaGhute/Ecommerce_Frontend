import React, { useEffect, useState } from "react";
import axios from "axios";
import { ListGroup } from "react-bootstrap";
import {
  FaTachometerAlt,
  FaUsers,
  FaMoneyBill,
  FaCalendar,
  FaChartLine,
} from "react-icons/fa";
import MyNavbar from "../component/Navbar";

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
          <div className="container">
            <label>Username:-</label>
            <h6>{user.email}</h6>
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
    <>
      <MyNavbar onToggleSidebar={handleSidebarToggle} />
      <div className="d-flex">
        <div
          className={`bg-light ${
            sidebarOpen ? "sidebar-open" : "sidebar-closed"
          } p-3`}
          style={{
            minHeight: "100vh",
            width: "250px",
            transition: "width 0.3s",
          }}
        >
          <button
            onClick={handleSidebarToggle}
            className="btn btn-primary mb-3"
          >
            {sidebarOpen ? "Close Sidebar" : "Open Sidebar"}
          </button>
          <ListGroup variant="flush">{renderSidebarItems()}</ListGroup>
        </div>
        <div
          className="flex-grow-1"
          style={{
            marginLeft: sidebarOpen ? "250px" : "0",
            transition: "margin-left 0.3s",
          }}
        >
          <div className="container mt-5">
            <h2>Welcome to the Dashboard</h2>
            <p>This is a protected page accessible only to logged-in users.</p>
            <h3>{user.name}</h3>
            <h4>{user.email}</h4>
            <h4>{user.role}</h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
