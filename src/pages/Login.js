import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import NavbarSignupLogin from '../components/NavbarSignupLogin.js';
import Footer from "../components/Footer.js";

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const values = { email, password };
    const response = await fetch('http://localhost:4000/api/login', {
      method: 'POST', headers: {
        'Content-Type': 'application/json'
      }, body: JSON.stringify(values)
    })
    const data = await response.json();
    console.log(data);
    localStorage.setItem("user_id", data.id)
    if (response.ok) {
      localStorage.setItem("email", email);
      navigate('/Trips')
    } else {
      setError(data)
    }
  }

  useEffect(() => {
    const id_logged = localStorage.getItem('user_id');
    if (id_logged) {
      navigate("/trips")
    } else { };
  }, [])

  return (

    <div className="bg-light w-100 h-100 position-absolute d-inline-block ">
      <NavbarSignupLogin />
      <div className="container-md bg-white rounded-3 my-5 p-4">
        <h1 className="text-center">Log In</h1>
        <form className="form-horizontal row g-2" id="loginForm" onSubmit={handleSubmit}>
          <div className="col-10 offset-1 col-lg-4 offset-lg-4 my-4 div-wrapper">
            <label className="form-label" htmlFor="form3Example1cg">Email</label>
            <input onChange={(event) =>
              setEmail(event.target.value)
            } type="text" id="form3Example1cg" name="email" className="form-control form-control-lg" />
          </div>
          <div className="col-10 offset-1 col-lg-4 offset-lg-4 my-4 div-wrapper">
            <label className="form-label" htmlFor="form3Example4cg">Password</label>
            <input onChange={(event) =>
              setPassword(event.target.value)
            } type="password" name="password" id="form3Example4cg" className="form-control form-control-lg" />
            {error ? <p id="invalidPassword" className="invalidPassword">Password and email do not
              match!</p> : null}
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-dark btn-block btn-lg">Log
              In</button>
          </div>
          <p className="text-center text-muted mt-5 mb-0">Dont have an account?<Link to={"/sign-up"}>Sign Up</Link></p>
        </form>
      </div>
      <Footer />
    </div>
  );
}
