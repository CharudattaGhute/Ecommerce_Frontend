import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleemail = (e) => {
    setEmail(e.target.value);
  };
  const handlepassword = (e) => {
    setPassword(e.target.value);
  };

  async function login(payload) {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/users/login",
        payload
      );
      const { access: token, success } = response.data;
      setToken(token);
      console.log(token);
      setSuccess(success);
      console.log(success);
      localStorage.setItem("token", token);
      toast.success("User successfully logged in");
      return success;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("Invalid Email or Password");
      } else if (error.response && error.response.status === 404) {
        toast.error("User is not registered");
      } else {
        toast.error("Login failed. Please try again.");
      }
      return false;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginSuccess = await login({ email, password });
    if (loginSuccess) {
      navigate("/dashboard");
    }
  };

  return (
    <section className="h-100 h-custom" style={{ backgroundColor: "#8fc4b7" }}>
      <div className="container py-5 h-900" style={{ height: "100vh" }}>
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-6 col-xl-5">
            <div
              className="card rounded-3"
              style={{ width: "100%", maxWidth: "500px" }}
            >
              <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Login</h3>

                <form className="px-md-2" onSubmit={handleSubmit}>
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="email">
                      EMAIL
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      value={email}
                      onChange={handleemail}
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
                      onChange={handlepassword}
                    />
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
                    Login
                  </button>
                  <h8 style={{ marginLeft: "20%" }}>
                    You have to register first!{" "}
                    <Link to="/">
                      <span type="button" style={{ color: "blue" }}>
                        Register
                      </span>
                    </Link>
                  </h8>
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

export default Login;
