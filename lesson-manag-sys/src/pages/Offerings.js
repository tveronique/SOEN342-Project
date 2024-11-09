import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useFetchBookings from '../hooks/useFetchBookings';
import BookingButton from '../components/BookingButton';

function Offerings() {
  const { bookings, error } = useFetchBookings();
  console.log("booooookings:", bookings)
  const [detailedBookings, setDetailedBookings] = useState([]);

  useEffect(() => {

    const fetchDetailsForBookings = async () => {
      const bookingDetailsPromises = bookings.map(async (booking) => {
        try {      console.log('Booking data:', booking);  // Log the entire booking object
            console.log('Offering ID:', booking.offeringId); // Log the offeringId
            console.log('Instructor Phone:', booking.instructorPhoneNumber);
          // Fetch offering details
          const offeringResponse = await axios.get(`/api/offerings/${booking.offeringId}`);
          const offeringData = offeringResponse.data;
          console.log("offering data:", offeringData);

          // Fetch instructor details
          const instructorResponse = await axios.get(`/api/users/phone/${booking.instructorPhoneNumber}`);
          const instructorData = instructorResponse.data;

          return { ...booking, offering: offeringData, instructor: instructorData };
        } catch (error) {
          console.error('Error fetching details:', error);
          return { ...booking, offering: null, instructor: null };
        }
      });
      // Wait for all booking details to be fetched
      const bookingDetails = await Promise.all(bookingDetailsPromises);
      setDetailedBookings(bookingDetails);
      console.log("booking details:", bookingDetails);
    };

    fetchDetailsForBookings();
  }, [bookings]);

  if (error) {
    return <div>Error loading bookings: {error.message}</div>;
  }

  return (
    <div>
      <h2>Offerings</h2>
      {detailedBookings.map((booking) => (
        <div key={booking.id} className="viewOfferings">
          <h3>{booking.offering.lesson.type} LESSON</h3>
          <p>
            <b>Location</b>: {booking.offering?.location.name} {booking.offering?.location.space.type}, {booking.offering?.location.city} <br />
            <b>Day</b>: {booking.offering?.location.schedule.day}s from {booking.offering?.location.schedule.startDate} until {booking.offering?.location.schedule.endDate}<br />
            <b>Time</b>: {booking.offering?.location.schedule.startTime} - {booking.offering?.location.schedule.endTime} <br />
            <b>{booking.offering?.lesson.private ? "Private lesson" : "Group lesson"}</b> <br></br>
            <b>Instructor</b>: {booking.instructor?.name} <br></br>
            <b>Instructor Phone</b>: {booking.instructor?.phoneNumber}
          </p> {console.log(booking.id)}
          <p className='text-center'><BookingButton bookingId={booking.id} /> </p>
        </div>
      ))}
    </div>
  );
}

export default Offerings;