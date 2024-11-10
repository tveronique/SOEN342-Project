// src/hooks/useFetchClientBookings.js

import { useState, useEffect } from "react";
import axios from "axios";
import useFetchBookings from "./useFetchBookings";

const useFetchBookingsByClientPhone = () => {
    const { bookings, error } = useFetchBookings();
    const [detailedBookings, setDetailedBookings] = useState([]);
    const userPhoneNumber = localStorage.getItem("phoneNumber");

    useEffect(() => {
        const fetchSelectedBookings = async () => {
            const clientBookings = bookings.filter(booking =>
                booking.clientPhoneNumbers.includes(userPhoneNumber)
            );

            const bookingDetailsPromises = clientBookings.map(async (booking) => {
                try {
                    const offeringResponse = await axios.get(`/api/offerings/${booking.offeringId}`);
                    const instructorResponse = await axios.get(`/api/users/phone/${booking.instructorPhoneNumber}`);

                    return {
                        ...booking,
                        offering: offeringResponse.data,
                        instructor: instructorResponse.data
                    };
                } catch (error) {
                    console.error("Error fetching booking details:", error);
                    return { ...booking, offering: null, instructor: null };
                }
            });

            const bookingDetails = await Promise.all(bookingDetailsPromises);
            setDetailedBookings(bookingDetails);
        };

        if (bookings.length && userPhoneNumber) {
            fetchSelectedBookings();
        }
    }, [bookings, userPhoneNumber]);

    return { detailedBookings, error };
};

export default useFetchBookingsByClientPhone;
