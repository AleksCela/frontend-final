import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet';
import "./style.css";
import { useEffect, useState } from 'react';


export default function TripsMap() {
    const navigate = useNavigate();
    const position = [51.505, -0.09]

    const [trips, setTrips] = useState([]);

    const getTrips = async () => {
        const user_id = localStorage.getItem("user_id")
        const response = await fetch(`http://localhost:4000/api/trips/${user_id}`)
        const data = await response.json()
        setTrips(data)
    }

    useEffect(() => {     //if not logged in => redirects to login , otherwise gets the trips
        const id_logged = localStorage.getItem('user_id');
        if (!id_logged) {
            navigate("/login")
        } else {
            getTrips()
        }
    }, [])


    return (
        <div>
            <Navbar />
            <div className="container-fluid bg-light">
                <div className="col-md-12 text-center ">
                    <button className="btnMap btn-lg btn-secondary rounded-pill" type="button" id="btn"> <i class="bi bi-map p-2"></i>Map</button>
                    <button onClick={() => navigate('/trips')} className="btnTable btn-lg btn-primary rounded-pill" type="button" id="btn"> <i class="bi bi-table p-2"></i>Table</button>
                </div>
                <button onClick={() => navigate('/create-trips')} className="buttonCreate btn btn-success btn-rounded" >New Trip</button>
                <MapContainer center={position} zoom={5} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {trips.map(({ id, date, destination, description, days, rating, latitude, longitude }, index) => (
                        <Marker key={index} position={[latitude, longitude]}>
                            <Popup>
                                {/* <div className="card">
                                    <div className="card-header">{destination}</div>
                                    <div className="card-main">
                                        <p>Description:{description}</p>
                                        <p>Date: {date}</p>
                                        <p>Days: {days}</p>
                                        <p>Rating:{rating}</p>
                                    </div>
                                    <div className='card-footer' >Hello</div>
                                </div> */}
                                <div className="frame-1087">
                                    <div className="flex-container">
                                        <span>{date}</span>
                                        <span className="creazione-nuovo-task">{days} days</span>
                                    </div>
                                    <span className="creazione-nuovo-task-1">{destination}</span>
                                    <span className="creazione-nuovo-task-2">{destination}</span>
                                    <span className="creazione-nuovo-task-3">
                                        {description}
                                    </span>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
            <Footer />
        </div>
    )
}