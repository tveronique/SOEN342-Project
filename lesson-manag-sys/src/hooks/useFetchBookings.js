import { useState, useEffect } from "react";
import axios from "axios";

const useFetchBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("/api/bookings");
        setBookings(response.data);
        console.log("Bookings fetched successfully:", response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError(error);
      }
    };

    fetchBookings();
  }, []);

  return { bookings, error };
};

export default useFetchBookings;