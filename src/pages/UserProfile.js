export default function UserProfile() {
    async function changeEmail(event) {
        event.preventDefault();
        const id = localStorage.getItem("user_id")
        const form = event.target;
        const formData = new FormData(form);
        const newEmail = formData.get("email");
        const values = { newEmail, id };
        const response = await fetch(`http://localhost:4000/api/user/updateEmail`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });
        const data = await response.json();
        if (response.ok) {
            window.alert("Email Updated")
        } else {
            console.log("error");
        }
    }
    return (
        <div>
            <div>
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
            <div>
                Change Password
            </div>



        </div>

    )
}