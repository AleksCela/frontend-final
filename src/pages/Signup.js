import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    }
  };

  function redirectLogin() {
    navigate("/login");
  }

  return (
    <form id="registrationForm" onSubmit={handleSubmit}>
      <div className="form-outline mb-4">
        <label className="form-label" htmlFor="form3Example1cg">Email:</label>
        <input
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          id="form3Example1cg"
          name="email"
          className="form-control form-control-lg"
        />
      </div>
      <div className="form-outline mb-4">
        <label className="form-label" htmlFor="form3Example4cg">Password:</label>
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
        <button type="submit" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Signup</button>
      </div>
      <p className="text-center text-muted mt-5 mb-0">
        Already have an account?
        <button onClick={redirectLogin}>Login Here</button>
      </p>
    </form>
  );
}
