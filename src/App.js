import "./App.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyNavbar from "./component/Navbar";
import React, { useState } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [cart, setCart] = useState([]);

  return (
    <Router>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/*" element={<Dashboard cart={cart} />} />
        <Route
          path="/navbar"
          element={
            <MyNavbar
              cartCount={cart.reduce((total, item) => total + item.quantity, 0)}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
