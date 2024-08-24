import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobilenumber] = useState("");
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const usernamechange = (e) => setUsername(e.target.value);
  const emailchange = (e) => setEmail(e.target.value);
  const passwordchange = (e) => setPassword(e.target.value);
  const mobilenumberchange = (e) => setMobilenumber(e.target.value);
  const rolechnage = (e) => setRole(e.target.value);

  async function register(payload) {
    console.log("***", payload);
    try {
      const response = await axios.post(
        "http://localhost:5001/api/users/register",
        payload
      );
      console.log("response.data", response.data);
      toast.success(response.data.message || "Registration Successful");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.error || "Registration failed");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { username, email, password, mobileNumber, role };
    console.log("****Payload**", payload);
    await register(payload);
  };

  return (
    <section className="h-600 h-custom" style={{ backgroundColor: "#8fc4b7" }}>
      <div className="container py-5 h-900" style={{ height: "100vh" }}>
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-6 col-xl-5">
            <div
              className="card rounded-3"
              style={{ width: "100%", maxWidth: "500px" }}
            >
              <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">
                  Registration Info
                </h3>

                <form className="px-md-2" onSubmit={handleSubmit}>
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="username">
                      USERNAME
                    </label>
                    <input
                      type="text"
                      id="username"
                      className="form-control"
                      value={username}
                      onChange={usernamechange}
                      required
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="email">
                      EMAIL
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      value={email}
                      onChange={emailchange}
                      required
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="password">
                      PASSWORD
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      value={password}
                      onChange={passwordchange}
                      required
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="mobileNumber">
                      MOBILENUMBER
                    </label>
                    <input
                      type="text"
                      id="mobileNumber"
                      className="form-control"
                      value={mobileNumber}
                      onChange={mobilenumberchange}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label" htmlFor="role">
                      ROLE
                    </label>
                    <select
                      className="form-select"
                      id="role"
                      value={role}
                      onChange={rolechnage}
                    >
                      <option value="" disabled>
                        Select Role
                      </option>
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-success btn-lg mb-1"
                    style={{
                      display: "block",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  >
                    Register
                  </button>
                  <div>
                    <h8 style={{ marginLeft: "20%" }}>
                      Yes already have Account!{" "}
                      <Link to="/login">
                        <span type="Button" style={{ color: "blue" }}>
                          Login
                        </span>
                      </Link>
                    </h8>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Register;
