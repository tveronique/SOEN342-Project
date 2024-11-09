import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

const BookingButton = ({ booking }) => {
    const navigate = useNavigate();

    const handleBooking = async () => {
        const userRole = localStorage.getItem('role'); 
        const userPhoneNumber = localStorage.getItem('phoneNumber'); 

        if (!userRole || !userPhoneNumber) {
            navigate('/login');
            return;
        }

        if (userRole === 'CLIENT') {
            try {
                console.log(userPhoneNumber);
                await axios.put(`/api/bookings/${booking.id}/addClient`, null, {
                    params: { phoneNumber: userPhoneNumber }
                });
                // await axios.put(`/api/bookings/${bookingId}/addClient?phoneNumber=${userPhoneNumber}`);
                alert("Booking successful!");
            } catch (error) {
                console.error("Error updating booking:", error);
                alert("There was an issue with your booking. Please try again.");
            }
        } else {
            alert("Only clients can make bookings.");
        }
    };

    return (
        <Button onClick={handleBooking} variant="outline-primary">
            Book Now
        </Button>
    );
};

export default BookingButton;