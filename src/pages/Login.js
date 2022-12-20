import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

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
    const emailLogged = localStorage.getItem('email');
    if (emailLogged) {
      navigate("/trips")
    } else { };
  },)

  return (
    <form id="loginForm" onSubmit={handleSubmit}>
      <div className="form-outline mb-4">
        <input onChange={(event) =>
          setEmail(event.target.value)
        } type="text" id="form3Example1cg" name="email" className="form-control form-control-lg" />
        <label className="form-label" htmlFor="form3Example1cg">email</label>
      </div>
      <div className="form-outline mb-4">
        <input onChange={(event) =>
          setPassword(event.target.value)
        } type="password" name="password" id="form3Example4cg" className="form-control form-control-lg" />
        <label className="form-label" htmlFor="form3Example4cg">Password</label>
        {error ? <p id="invalidPassword" className="invalidPassword">Password and email do not
          match!</p> : null}
      </div>
      <div className="d-flex justify-content-center">
        <button type="submit" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Log
          In</button>
      </div>
      <p className="text-center text-muted mt-5 mb-0">Dont have an account?<Link to={"/sign-up"}>Sign Up</Link></p>
    </form>

  );
}
