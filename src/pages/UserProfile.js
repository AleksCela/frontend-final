import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function UserProfile() {
    const navigate = useNavigate();
    const [email, setEmail] = useState(localStorage.getItem("email"));

    async function deleteAccount() {
        const id = localStorage.getItem("user_id");
        await fetch(`http://localhost:4000/api/user/${id}`, {
            method: "DELETE",
        });
        localStorage.clear();
        navigate("/login");
    }

    async function changeEmail(event) {
        event.preventDefault();
        const id = localStorage.getItem("user_id");
        const form = event.target;
        const formData = new FormData(form);
        const newEmail = formData.get("email"); 
        const values = { newEmail, id };
        const response = await fetch(`http://localhost:4000/api/update-email`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });
        if (response.ok) {
            window.alert("Email Updated!");
            localStorage.setItem("email", newEmail);
            setEmail(newEmail);
        } else {
            window.alert("Could not update email!");
        }
        form.reset();
    }
    async function changePassword(event) {
        event.preventDefault();
        const id = localStorage.getItem("user_id");
        const form = event.target;
        const formData = new FormData(form);
        const currentPassword = formData.get("currentPassword");
        const newPassword = formData.get("newPassword");
        const values = { currentPassword, newPassword, id };
        const response = await fetch(`http://localhost:4000/api/update-password`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });
        if (response.ok) {
            window.alert("Password Updated!");
        } else {
            window.alert("Could not update password!");
        }
        form.reset();
    }

    useEffect(() => {                                                            //if not logged in => redirects to login
        const idLogged = localStorage.getItem("user_id");
        if (!idLogged) {
            navigate("/login");
        }
    }, []);

    return (
        <div className="back bg-light vh-100">
            <Navbar />
            <div className="container-md bg-white rounded-3 w-75 my-5 p-4">
                <h1>Personal Information</h1>
                <form id="changeEmail" onSubmit={changeEmail}>
                    <label className="form-label" htmlFor="changeEmailInput">
                        Email
                    </label>
                    <input
                        placeholder={email}
                        type="email"
                        id="changeEmailInput"
                        name="email"
                        className="form-control form-control-lg"
                    />
                    <div className="d-md-flex justify-content-md-end">
                        <button type="submit" className="btn btn-secondary btn-lg m-2 col-md-2">
                            Save
                        </button>
                    </div>
                </form>
            </div>
            <div className="container-md bg-white rounded-3 w-75 my-5 p-4">
                <h1>Security</h1>
                <form className="row g-2" id="changePassword" onSubmit={changePassword}>
                    <div className="col-md-6">
                        <label className="form-label" htmlFor="changePasswordInput">
                            Current Password
                        </label>
                        <input
                            type="password"
                            id="changePasswordInput"
                            name="currentPassword"
                            className="form-control form-control-lg col-md-2 col-lg-4 "
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label" htmlFor="inputNewPassword">
                            New Password
                        </label>
                        <input
                            type="password"
                            id="inputNewPassword"
                            name="newPassword"
                            className="form-control form-control-lg col-md-2"
                            required
                        />
                    </div>
                    <div className="d-md-flex justify-content-md-end">
                        <button type="submit" className="btn btn-secondary btn-lg m-2 col-md-2 ">
                            Save
                        </button>
                    </div>
                </form>
                <button onClick={deleteAccount} className="btn btn-danger btn-lg"><i className="bi bi-trash3-fill"></i>Delete Account</button>
            </div>
            <Footer />
        </div>
    );
}
