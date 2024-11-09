import useFetchOfferings from "../hooks/useFetchOfferings";
import "../App.css";
import useFetchUserByPhone from "../hooks/useFetchUserByPhone";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";
import { useState, useEffect } from "react";

function InstructorDashboard() {
    const { offerings, error } = useFetchOfferings();
    const phoneNumber = localStorage.getItem('phoneNumber');
    const { user } = useFetchUserByPhone(phoneNumber);
    const [bookedOfferings, setBookedOfferings] = useState([]);

    const availableCities = user?.availableCities || [];
    const specialization = user?.specialization || [];

    useEffect(() => {
        const fetchBookedOfferings = async () => {
            try {
                const response = await axios.get(`/api/bookings?phoneNumber=${phoneNumber}`);
                const bookingIds = response.data.map(booking => booking.offeringId);
                setBookedOfferings(bookingIds);
            } catch (err) {
                console.error("Error fetching bookings:", err);
            }
        };

        fetchBookedOfferings();
    }, [phoneNumber]);

    if (error) {
        return <div>Error loading offerings: {error.message}</div>;
    }

    const filteredOfferings = offerings.filter(offering => {
        const cityMatch = availableCities.includes(offering.location.city);
        const specializationMatch = specialization.includes(offering.lesson.type);
        const notBooked = !bookedOfferings.includes(offering.id);

        return cityMatch && specializationMatch && notBooked;
    });

    const handleSubmit = async (offering) => {
        try {
            const booking = { offeringId: offering.id, instructorPhoneNumber: phoneNumber };
            const response = await axios.post('/api/bookings/create', booking);
            console.log(booking);
            if (response.status === 200) {
                setBookedOfferings([...bookedOfferings, offering.id]);
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
                            <b>{offering.lesson.private ? "Private lesson" : "Group lesson"}</b><br />
                            <Button
                                variant="outline-primary"
                                style={{ display: 'flex', margin: '0 auto', width: '50%', justifyContent: 'center' }}
                                onClick={() => handleSubmit(offering)}
                            >
                                Select
                            </Button>
                        </p>
                    </div>
                ))
            ) : (
                <p>No offerings match your location and specialization criteria.</p>
            )}
        </div>
    );
}

export default InstructorDashboard;
