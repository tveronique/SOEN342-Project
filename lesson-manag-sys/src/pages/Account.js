// src/components/Account.js

import React from "react";
import axios from "axios";
import useFetchBookingsByClientPhone from "../hooks/useFetchBookingsByClientPhone";
import Button from "react-bootstrap/Button";

function Account() {
    const { detailedBookings, error } = useFetchBookingsByClientPhone();
    const userPhoneNumber = localStorage.getItem("phoneNumber");

    const handleCancelBooking = async (booking) => {
        try {
            await axios.put(`/api/bookings/${booking.id}/removeClient`, null, {
                params: { phoneNumber: userPhoneNumber }
            });
            alert("Booking cancelled successfully!");
            window.location.reload();
        } catch (error) {
            console.error("Error canceling booking:", error);
            alert("There was an issue canceling the booking. Please try again.");
        }
    };

    if (error) {
        return <div>Error loading bookings: {error.message}</div>;
    }

    return (
        <div>
            <h2>Your Bookings</h2>
            {detailedBookings.length === 0 ? (
                <p>You have no bookings at the moment.</p>
            ) : (
                detailedBookings.map((booking) => (
                    <div key={booking.id} className="viewOfferings">
                        <h3>{booking.offering.lesson.type} LESSON</h3>
                        <p>
                            <b>Location</b>: {booking.offering?.location.name} {booking.offering?.location.space.type}, {booking.offering?.location.city} <br />
                            <b>Day</b>: {booking.offering?.location.schedule.day}s from {booking.offering?.location.schedule.startDate} until {booking.offering?.location.schedule.endDate}<br />
                            <b>Time</b>: {booking.offering?.location.schedule.startTime} - {booking.offering?.location.schedule.endTime} <br />
                            <b>{booking.offering?.lesson.private ? "Private lesson" : "Group lesson"}</b> <br />
                            <b>Instructor</b>: {booking.instructor?.name} <br />
                            <b>Instructor Phone</b>: {booking.instructor?.phoneNumber}
                        </p>
                        <Button
                            onClick={() => handleCancelBooking(booking)}
                            className="cancel-button"
                            variant="outline-primary"
                        >
                            Cancel Booking
                        </Button>
                    </div>
                ))
            )}
        </div>
    );
}

export default Account;
