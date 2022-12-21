import React, { } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();
    return (
        <nav class="navbar navbar-expand-lg bg-white">
            <div class="container-fluid">
                <a class="navbar-brand"><b>My trips</b> diary</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-end" id="navbarText">
                    <ul class="navbar-nav mb-2 mb-lg-0 gap-3">
                        <li class="nav-item ml-4">
                            <Link style={{ textDecoration: 'none', color: 'black' }} to={"/trips"}>My Trips</Link>
                        </li>
                        <li>
                            <span class="nav-item" >
                                <Link style={{ textDecoration: 'none', color: 'black' }} to={"/user-profile"}><i class="bi bi-person-circle"></i></Link>
                            </span>
                        </li>
                        <li>
                            <span class="nav-item" onClick={() => {
                                localStorage.clear();
                                navigate("/login")
                            }} >
                                <i class="bi bi-box-arrow-right"></i>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}