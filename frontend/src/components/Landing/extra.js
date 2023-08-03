import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ForgotPassword from "./ForgotPassword";
import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [temporaryPassword, setTemporaryPassword] = useState(null); // Add this line to define the state

  const navigate = useNavigate();

  const formSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .post(`http://localhost:4000/api/user/verify`, { email, password })
      .then((res) => {
        if (res.status === 200) {
          Cookies.set("authToken", res.data.token);

          navigate("/");
          setLoginSuccess(true);
        }
      })
      .catch((error) => {
        console.error(error.response.data);
        setLoginSuccess(false);
      });
    setLoading(false);
  };

  return (
    <div className="flex flex-col p-2 space-y-3 my-[3vh] ">
      <form onSubmit={formSubmit} className="form space-y-3">
        <div className="space-y-2">
          <label className="flex flex-col" htmlFor="email">
            <span className="text-xl">Email</span>
            <input className="form-input text-black" id="email" type="text" placeholder="Enter Your email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>

          <label className="flex flex-col" htmlFor="password">
            <span className="text-xl">Password</span>
            <input className="form-input text-black" id="password" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button type="submit" className={`py-1 px-4 bg-primary rounded-lg text-white ${loading ? "opacity-50" : ""}`} disabled={loading}>
            {loading ? "Login..." : "Login"}
          </button>
        </div>
      </form>

      {loginSuccess === false && (
        <div>
          <span className="text-red-600 text-xs leading-3">Invalid Credentials</span>
          <span className="text-blue-400 cursor-pointer underline">
            <ForgotPassword />
          </span>
        </div>
      )}

      <div>
        <span>New to ForumApp?</span>
        <Link to="/register">
          <span className="text-blue-400 underline ml-2">Register Now</span>
        </Link>
      </div>
    </div>
  );
};

export default Login;
