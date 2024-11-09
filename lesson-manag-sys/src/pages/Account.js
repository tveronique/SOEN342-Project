import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useFetchBookings from '../hooks/useFetchBookings';
import Button from 'react-bootstrap/Button';


function Account() {
  const { bookings, error } = useFetchBookings();
  const [detailedBookings, setDetailedBookings] = useState([]);

  const userPhoneNumber = localStorage.getItem('phoneNumber'); // Get client phone number

  useEffect(() => {
    const fetchSelectedBookings = async () => {
      // Filter bookings to include only those the client booked
      const clientBookings = bookings.filter(booking =>
        booking.clientPhoneNumbers.includes(userPhoneNumber)
      );

      // Fetch detailed data for each booking
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
          console.error('Error fetching details:', error);
          return { ...booking, offering: null, instructor: null };
        }
      });
      
      // Wait for all details to load
      const bookingDetails = await Promise.all(bookingDetailsPromises);
      setDetailedBookings(bookingDetails);
    };

    fetchSelectedBookings();
  }, [bookings, userPhoneNumber]);

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
        <p>You have no bookings at the moment.</p> // Display message when no bookings
      ) : (
        detailedBookings.map((booking) => (
          <div key={booking.id} className="viewOfferings">
            <h3>{booking.offering.lesson.type} LESSON</h3>
            <p>
              <b>Location</b>: {booking.offering?.location.name} {booking.offering?.location.space.type}, {booking.offering?.location.city} <br />
              <b>Day</b>: {booking.offering?.location.schedule.day}s from {booking.offering?.location.schedule.startDate} until {booking.offering?.location.schedule.endDate}<br />
              <b>Time</b>: {booking.offering?.location.schedule.startTime} - {booking.offering?.location.schedule.endTime} <br />
              <b>{booking.offering?.lesson.private ? "Private lesson" : "Group lesson"}</b> <br></br>
              <b>Instructor</b>: {booking.instructor?.name} <br></br>
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
