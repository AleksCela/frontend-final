import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Rating } from "@mui/material";
import { useEffect, useState } from "react";

export default function TripsMap() {
    const navigate = useNavigate();
    const position = [51.505, -0.09];
    const [trips, setTrips] = useState([]);

    useEffect(() => {                                                //if not logged in => redirects to login , otherwise gets the trips
        const id_logged = localStorage.getItem("user_id");
        if (!id_logged) {
            navigate("/login");
        } else {
            getTrips();
        }
    }, []);

    const getTrips = async () => {
        const user_id = localStorage.getItem("user_id");
        const response = await fetch(`http://localhost:4000/api/trips/${user_id}`);
        const data = await response.json();
        setTrips(data);
    };

    return (
        <div>
            <Navbar />
            <div className="container-fluid bg-light">
                <div className="col-md-12 text-center">
                    <button className="btnMap btn btn-dark rounded-pill" type="button" id="btn">
                        <i className="bi bi-map p-2"></i>
                        Map
                    </button>
                    <button onClick={() => navigate("/trips")} className="btnTable btn btn-light rounded-pill" type="button" id="btn">
                        <i className="bi bi-table p-2"></i>
                        Table
                    </button>
                </div>
                <button onClick={() => navigate("/create-trips")} className="buttonCreate col-md-2 btn btn-danger shadow">
                    New Trip
                </button>
                <MapContainer center={position} zoom={3} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {trips.map(
                        ({ id, date, destination, description, days, rating, latitude, longitude, country }, index) => (
                            <Marker key={index} position={[latitude, longitude]} eventHandlers={{ mouseover: (event) => event.target.openPopup() }}>
                                <Popup>
                                    <div className="frame">
                                        <div className="flex-container">
                                            <p>{date}</p>
                                            <p className="days">{days} days</p>
                                        </div>
                                        <p className="country">{country}</p>
                                        <p className="destination">{destination}</p>
                                        <p className="description">{description}</p>
                                        <Rating name="rating" value={rating} readOnly />
                                    </div>
                                </Popup>
                            </Marker>
                        )
                    )}
                </MapContainer>
            </div>
            <Footer />
        </div>
    );
}
