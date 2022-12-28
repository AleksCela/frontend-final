import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import NavbarSignupLogin from "../components/NavbarSignupLogin.js";
import Footer from "../components/Footer.js";

export default function Signup() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const createAccount = async (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const email = formData.get("email");
        const password = formData.get("password");
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
            localStorage.setItem("email", email);
            navigate("/login");
        } else {
            setError(data);
            localStorage.clear();
        }
    };

    useEffect(() => {
        const emailLogged = localStorage.getItem("email");
        if (emailLogged) {
            navigate("/trips");
        } else {
        }
    }, []);

    return (
        <div className="bg-light w-100 h-100 position-absolute d-inline-block ">
            <NavbarSignupLogin />
            <div className="container-md bg-white rounded-3 my-5 p-4">
                <h1 className="text-center">Sign Up</h1>
                <form onSubmit={createAccount} className="form-horizontal row g-2" id="registrationForm">
                    <div className="col-10 offset-1 col-lg-4 offset-lg-4 my-4 div-wrapper">
                        <label className="form-label" htmlFor="emailInput">
                            Email
                        </label>
                        <input
                            type="email"
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
                            <p id="invalidPassword" className="invalidPassword">
                                Invalid email or password!
                            </p>
                        ) : null}
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-dark btn-block btn-lg">
                            Sign Up
                        </button>
                    </div>
                    <p className="text-center text-muted mt-5 mb-0">
                        Already have an account?<Link to={"/login"}>Login Here</Link>
                    </p>
                </form>
            </div>
            <Footer />
        </div>
    );
}
