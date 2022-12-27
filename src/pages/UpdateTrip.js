import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";

export default function UpdateTrip() {
    const [coordinates, setCoordinates] = useState({});
    const [destinationDirect, setDestinationDirect] = useState([]);
    const [country, setCountry] = useState("");

    const handleDestination = async (event) => {
        setDestinationDirect(event.target.value);
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${destinationDirect}`
        );
        const data = await response.json();
        if (data.length > 0) {
            const tripCoordinates = {
                lat: data[0].lat,
                lon: data[0].lon,
            };
            setCoordinates(tripCoordinates);
            const responseCountry = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${tripCoordinates.lat}&lon=${tripCoordinates.lon}&format=json`
            );
            const dataCountry = await responseCountry.json();
            setCountry(dataCountry.address.country);
        }
    };

    const navigate = useNavigate();
    const trip_id = window.localStorage.getItem("trip_id");
    const UpdateTrip = async (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const user_id = Number(window.localStorage.getItem("user_id"));
        const date = formData.get("date");
        const destination = formData.get("destination");
        const description = formData.get("description");
        const days = formData.get("days");
        const rating = formData.get("rating");
        const values = { date, destination, description, days, rating, country, user_id, trip_id };
        const response = await fetch(`http://localhost:4000/api/trips/${trip_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });
        if (response.ok) {
            window.alert("Trip is updated!");
            navigate("/trips");
        } else {
            window.alert("Couldn't update the trip!")
        }
    };

    return (
        <div className="bg-light w-100 h-100 position-absolute d-inline-block ">
            <Navbar />
            <div className="container-md bg-white rounded-3 my-5 p-4">
                <h3 className="text-center">Update Trip</h3>
                <p className="alert alert-danger col-md-4 offset-lg-4 text-center">
                    You must fill all mandatory fields!
                </p>
                <form onSubmit={UpdateTrip} className="row g-3">
                    <div className="col-md-4 col-lg-4 offset-lg-4 ">
                        <label htmlFor="inputDate" className="form-label">
                            Date*
                        </label>
                        <input
                            type="date"
                            name="date"
                            className="form-control"
                            id="input-date"
                            placeholder="2022-10-20"
                            required
                        />
                    </div>
                    <div className="col-md-2 col-lg-2 offset-lg-4">
                        <label htmlFor="inputDestination" className="form-label">
                            Destination*
                        </label>
                        <input
                            type="text"
                            onChange={handleDestination}
                            name="destination"
                            className="form-control"
                            id="input-destination"
                            placeholder="Choose the place..."
                            required
                        />
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="inputCountry" className="form-label">
                            Country
                        </label>
                        <input
                            value={country}
                            name="country"
                            type="text"
                            className="form-control"
                            id="input-lon"
                            readOnly
                        />
                    </div>
                    <div className="col-md-4 col-lg-4 offset-lg-4 ">
                        <label htmlFor="inputDescription" className="form-label">
                            Description*
                        </label>
                        <input
                            type="text"
                            name="description"
                            className="form-control"
                            id="input-destination"
                            placeholder="How was the trip?"
                            required
                        />
                    </div>
                    <div className="col-md-2 col-lg-2 offset-lg-4">
                        <label htmlFor="inputDays" className="form-label">
                            Days*
                        </label>
                        <input
                            type="number"
                            name="days"
                            className="form-control"
                            id="input-days"
                            placeholder="How many days?"
                            required
                        />
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="inputRating" className="form-label">
                            Rating*
                        </label>
                        <select
                            id="inputState"
                            name="rating"
                            className="form-select"
                            required
                        >
                            <option defaultValue={1}>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                    <div className="col-md-2 col-lg-2 offset-lg-4">
                        <label htmlFor="inputLat" className="form-label">
                            Latitude
                        </label>
                        <input
                            type="text"
                            value={coordinates.lat}
                            name="lat"
                            className="form-control"
                            id="input-lat"
                            readOnly
                        />
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="inputLon" className="form-label">
                            Longitude
                        </label>
                        <input
                            value={coordinates.lon}
                            name="lon"
                            type="text"
                            className="form-control"
                            id="input-lon"
                            readOnly
                        />
                    </div>
                    <div className="col-12 d-flex justify-content-center">
                        <button onClick={() => navigate("/trips")} type="submit" className="btn btn-cancel btn-outline-dark m-3 p-2">
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-dark m-3 p-2 col-md-2">
                            Update trip
                        </button>
                    </div>
                </form>
                <Footer />
            </div>
        </div>
    );
}
