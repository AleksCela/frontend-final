import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function UserProfile() {
    async function changeEmail(event) {
        event.preventDefault();
        const id = localStorage.getItem("user_id")
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
            window.alert("Email Updated!")
        } else {
            console.log("Could not update email!");
        }
    }
    async function changePassword(event) {
        event.preventDefault();
        const id = localStorage.getItem("user_id")
        const form = event.target;
        const formData = new FormData(form);
        const currentPassword = formData.get("currentPassword");
        const newPassword = formData.get("newPassword")
        const values = { currentPassword, newPassword, id };
        const response = await fetch(`http://localhost:4000/api/update-password`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });
        if (response.ok) {
            window.alert("Password Updated!")
        } else {
            console.log(response);
        }
    }

    return (
        <div className='bg-secondary vh-100'>
            <Navbar />

            <div className='container-md bg-white rounded-3 my-5 p-4'>
                <h1>Personal Information</h1>
                <form id="changeEmail" onSubmit={changeEmail}>
                    <label className="form-label" htmlFor="form3Example1cg">Email:</label>
                    <input
                        type="email"
                        id="form3Example1cg"
                        name="email"
                        className="form-control form-control-lg"
                    />
                    <button type="submit" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Save</button>
                </form>
            </div>

            <div className='container-md bg-white rounded-3 my-5 p-4'>
                <h1>Security</h1>
                <form id="changePassword" onSubmit={changePassword}>
                    <label className="form-label" htmlFor="form3Example1cg">Current Password:</label>
                    <input
                        type="password"
                        id="form3Example1cg"
                        name="currentPassword"
                        className="form-control form-control-lg"
                    />
                    <label className="form-label" htmlFor="form3Example1cg">New Password:</label>
                    <input
                        type="password"
                        id="form3Example1cg"
                        name="newPassword"
                        className="form-control form-control-lg"
                    />
                    <button type="submit" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Save</button>
                </form>
            </div>

            <Footer />
        </div >

    )
}