import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import NavbarSignupLogin from "../components/NavbarSignupLogin.js";
import Footer from "../components/Footer.js";

export default function Login() {
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const authentication = async (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const email = formData.get("email");
        const password = formData.get("password");
        const values = { email, password };
        const response = await fetch("http://localhost:4000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values)
        });
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem("email", email);
            localStorage.setItem("user_id", data.id);
            navigate("/trips");
        } else {
            setError(data);
            localStorage.clear();
        }
    };

    useEffect(() => {
        const idLogged = localStorage.getItem("user_id");
        if (idLogged) {
            navigate("/trips");
        }
    }, []);

    return (
        <div className="bg-light w-100 h-100 position-absolute d-inline-block ">
            <NavbarSignupLogin />
            <div className="container-md bg-white rounded-3 my-5 p-4">
                <h1 className="text-center">Log In</h1>
                <form onSubmit={authentication} className="form-horizontal row g-2" id="loginForm">
                    <div className="col-10 offset-1 col-lg-4 offset-lg-4 my-4 div-wrapper">
                        <label className="form-label" htmlFor="emailInput">
                            Email
                        </label>
                        <input
                            type="text"
                            id="emailInput"
                            name="email"
                            className="form-control form-control-lg"
                            minLength="5"
                            maxLength="20"
                            title="Email must contain 5 to 20 characters."
                        />
                    </div>
                    <div className="col-10 offset-1 col-lg-4 offset-lg-4 my-4 div-wrapper">
                        <label className="form-label" htmlFor="passwordInput">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="passwordInput"
                            className="form-control form-control-lg"
                            minLength="5"
                            maxLength="20"
                            title="Password must contain 5-20 characters and at least one number and one special character."
                        />
                        {error ? (
                            <p id="invalidPassword" className="invalidPassword ">
                                Email and password do not match!
                            </p>
                        ) : null}
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-dark btn-block btn-lg">
                            Log In
                        </button>
                    </div>
                    <p className="text-center text-muted mt-5 mb-0">
                        Don't have an account?<Link to={"/sign-up"}>Sign Up</Link>
                    </p>
                </form>
            </div>
            <Footer />
        </div>
    );
}