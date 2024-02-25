import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // toast.success("Register successfully");

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASEURL}/api/v1/auth/login`,
        {
          email,
          password,
        },
      );

      if (res && res.data.status === "success") {
        toast.success(res.data.message || "Login Successfully!");

        // setting authentication details using context api
        setAuth({
          ...auth,
          user: res.data.data,
          token: res.data.token,
        });

        // saving details in local storage
        localStorage.setItem("auth", JSON.stringify(res.data));

        // directly checkout to the url after login or if no url than home page
        navigate(location.state || "/");
      } else if (res.data.status === "fail") {
        toast.error(res.data.message || "Invalid Credentials!");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Register- E-Shop">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h4 className="title">LOGIN FORM</h4>

          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className=" mb-3">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot Password
            </button>
          </div>
          <button type="submit" className="btn btn-primary">
            LOGIN
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
