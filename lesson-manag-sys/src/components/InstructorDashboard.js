import useFetchOfferings from "../hooks/useFetchOfferings";
import "../App.css";
import useFetchUserByPhone from "../hooks/useFetchUserByPhone";
import { useAuth } from "../context/AuthContext";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";
import { useState } from "react";

function instructorDashboard() {
    const { offerings, error } = useFetchOfferings();
    const phoneNumber = localStorage.getItem('phoneNumber');
    console.log(phoneNumber);
    const {user, errors} = useFetchUserByPhone(phoneNumber);
    console.log(user);
    const availableCities = user.availableCities;
    const specialization = user.specialization;

    if (error) {
        return <div>Error loading offerings: {error.message}</div>;
    }

    const filteredOfferings = offerings.filter(offering => {
        // Check if offering's city matches any of the instructor's available cities
        const cityMatch = availableCities.includes(offering.location.city);

        // Check if offering's lesson type matches any of the instructor's specializations
        const specializationMatch = specialization.includes(offering.lesson.type);

        // Return true only if both conditions are met
        return cityMatch && specializationMatch;
    });

    const handleSubmit = async (offeringId) => {        
        try {
            const response = await axios.post('/api/bookings/create', {
                offeringId: offeringId,
                instructorPhoneNumber: phoneNumber
            });
            if (response.status === 200) {
                alert('Booking created successfully!');
            }
        } catch (error) {
            console.error('Error creating booking:', error);
            alert('Failed to create booking.');
        }
    };

    return (
        <div>
            <h1>Available Offerings for You</h1>

            {filteredOfferings.length > 0 ? (
                filteredOfferings.map((offering) => (
                    <div key={offering._id} className="viewOfferings">
                        <h3>{offering.lesson.type} Lesson</h3>
                        <p>
                            <b>Location</b>: {offering.location.name} {offering.location.space.type}, {offering.location.city} <br />
                            <b>Day</b>: {offering.location.schedule.day}s from {offering.location.schedule.startDate} until {offering.location.schedule.endDate} <br />
                            <b>Time</b>: {offering.location.schedule.startTime} - {offering.location.schedule.endTime} <br />
                            <b>{offering.lesson.private ? "Private lesson" : "Group lesson"}</b>
                            <Button variant="outline-primary" style={{display: 'flex', margin:'0 auto', width:'50%', justifyContent:'center'}} onClick={() => handleSubmit(offering._id)}>Select</Button>
                            {console.log(offerings._id)}
                        </p>
                    </div>
                ))
            ) : (
                <p>No offerings match your location and specialization criteria.</p>
            )}
        </div>
    );
}

export default instructorDashboard;
