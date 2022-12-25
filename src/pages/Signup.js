import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import NavbarSignupLogin from '../components/NavbarSignupLogin.js';
import Footer from "../components/Footer.js";

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const emailLogged = localStorage.getItem('email');
    if (emailLogged) {
      navigate("/trips")
    } else { };
  },)

  const handleSubmit = async (event) => {
    event.preventDefault();
    const values = { email, password };

    const response = await fetch("http://localhost:4000/api/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("all is ok");
      navigate("/login");
    } else {
      setError(data);
      localStorage.clear();
    }
  };

  return (
    <div className="bg-light w-100 h-100 position-absolute d-inline-block ">
      <NavbarSignupLogin />
      <div className="container-md bg-white rounded-3 my-5 p-4">
        <h1 className="text-center">Sign Up</h1>
        <form class="form-horizontal row g-2" id="registrationForm" onSubmit={handleSubmit}>
          <div className="col-10 offset-1 col-lg-4 offset-lg-4 my-4 div-wrapper">
            <label className="form-label" htmlFor="form3Example1cg">Email</label>
            <input
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              id="form3Example1cg"
              name="email"
              className="form-control form-control-lg "
            />
          </div>
          <div className="col-10 offset-1 col-lg-4 offset-lg-4 my-4 div-wrapper">
            <label className="form-label" htmlFor="form3Example4cg">Password</label>
            <input
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              name="password"
              id="form3Example4cg"
              className="form-control form-control-lg"
            />
            {error ? (<p id="invalidPassword" className="invalidPassword">Invalid email or password!</p>) : null}
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-dark btn-block btn-lg">Sign Up</button>
          </div>
          <p className="text-center text-muted mt-5 mb-0">Already have an account?<Link to={"/login"}>Login Here</Link></p>
        </form>
      </div>
      <Footer />
    </div>
  );
}
