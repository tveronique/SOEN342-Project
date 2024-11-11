// src/components/BookingButton.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import useFetchBookingsByClientPhone from '../hooks/useFetchBookingsByClientPhone';

const BookingButton = ({ booking }) => {
    const navigate = useNavigate();
    const { detailedBookings, error } = useFetchBookingsByClientPhone(); // Fetch client bookings using the hook
    const userRole = localStorage.getItem('role'); 
    const userPhoneNumber = localStorage.getItem('phoneNumber'); 

    const handleBooking = async () => {
        if (!userRole || !userPhoneNumber) {
            navigate('/login');
            return;
        }
        if (userRole === 'CLIENT') {
            try {
                // Ensure detailedBookings is defined and populated
                if (detailedBookings && detailedBookings.length > 0) {
                    // Check for overlapping bookings
                    const conflictingBooking = detailedBookings.some(existingBooking =>
                        existingBooking.offering.location.schedule.startTime === booking.offering.location.schedule.startTime &&
                        existingBooking.offering.location.schedule.startTime === booking.offering.location.schedule.startTime &&
                        existingBooking.clientPhoneNumbers.includes(userPhoneNumber)
                    );

                    if (conflictingBooking) {
                        alert("You already have a booking that starts at the same time.");
                        return;
                    }
                    
                }

                // Proceed with booking if no conflicts
                await axios.put(`/api/bookings/${booking.id}/addClient`, null, {
                    params: { phoneNumber: userPhoneNumber }
                });
                alert("Booking successful!");
            } catch (error) {
                console.error("Error updating booking:", error);
                alert("There was an issue with your booking. Please try again.");
            }
        } else {
            alert("Only clients can make bookings.");
        }
    };

    if (error) {
        return <div>Error loading client bookings: {error.message}</div>;
    }

    return (
        <Button onClick={handleBooking} variant="outline-primary">
            Book Now
        </Button>
    );
};

export default BookingButton;
