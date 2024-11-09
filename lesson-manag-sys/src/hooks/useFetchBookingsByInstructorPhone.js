import { useState, useEffect } from "react";
import axios from "axios";

const useFetchBookingsByInstructorPhone = (phoneNumber) => {
  const [bookings, setBookings] = useState([]);

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`/api/bookings/booked/${phoneNumber}`);
        setBookings(response.data);
        console.log("Bookings fetched successfully by instructor phone number", response.data);
      } catch (error) {
        console.error("Error fetching bookings by instructor phone number", error);
        setError(error);
      }
    };

    fetchBookings();
  }, []);

  return { bookings, error };
};

export default useFetchBookingsByInstructorPhone;