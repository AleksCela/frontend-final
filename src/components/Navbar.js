import React from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    return (
        <nav className="navbar navbar-expand-lg bg-white">
            <div className="container-fluid">
                <a className="navbar-brand">
                    <b>My trips</b> diary
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarText"
                    aria-controls="navbarText"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarText">
                    <ul className="navbar-nav mb-2 mb-lg-0 gap-3">
                        <li className="nav-item ml-4">
                            <Link id="myTrips" to={"/trips"}>
                                My Trips
                            </Link>
                        </li>
                        <li>
                            <span className="nav-item">
                                <Link id="userProfile" to={"/user-profile"}>
                                    <i className="bi bi-person-circle"></i>
                                </Link>
                            </span>
                        </li>
                        <li>
                            <span className="nav-item" onClick={() => {
                                localStorage.clear();
                                navigate("/login");
                            }}>
                                <i className="bi bi-box-arrow-right"></i>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}