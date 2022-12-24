import React, { } from 'react';
import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Trips() {
    const navigate = useNavigate();
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

    function updateTrip(event) {
        const update_id = event.currentTarget.id;
        window.localStorage.setItem("trip_id", update_id);
        navigate('/update-trip');
    }

    async function deleteTrip(event) {
        const delete_id = event.currentTarget.id;
        await fetch(`http://localhost:4000/api/trips/${delete_id}`, {
            method: 'DELETE'
        })
        window.alert("Trip deleted!");
        getTrips();
    }

    function renderTrips() {
        return trips.map(({ id, date, destination, description, days, rating }) => {
            return <tr key={id} >
                <td>{id}</td>
                <td>{date}</td>
                <td>{destination}</td>
                <td>{days}</td>
                <td>{rating}</td>
                <td><a onClick={updateTrip} id={id}><i class="bi bi-pencil"></i></a></td>
                <td><a onClick={deleteTrip} id={id}><i class="bi bi-trash"></i></a></td>
            </tr>
        })
    }

    function navigateToTrip() {
        navigate('/create-trips');
    }

    return (
        <div className="bg-light w-100 h-100 position-absolute d-inline-block ">
            <Navbar />
            <div className="container bg-light">
                <div className="col-md-12 text-center ">
                    <button onClick={() => navigate('/trips-map')} className="btnMap btn btn-outline-dark rounded-pill" type="button" id="btn"> <i class="bi bi-map p-2"></i>Map</button>
                    <button className="btnTable btn btn-dark rounded-pill" type="button" id="btn"> <i class="bi bi-table p-2"></i>Table</button>
                </div>
            </div>
            <div className="container bg-white mt-5 p-4">
                <div className='row'>
                    <h2 className='col'> My trips</h2>
                    <button onClick={navigateToTrip} className="col-md-2 btn btn-danger"> Create trip!</button>
                </div>  
                <table className="table container bg-white mt-4" id="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Date</th>
                            <th scope="col">Destination</th>
                            <th scope="col">Days</th>
                            <th scope="col">Rating</th>
                        </tr>
                    </thead>
                    <tbody id="tableBody">
                        {renderTrips()}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

