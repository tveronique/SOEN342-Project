import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import useFetchBookings from '../hooks/useFetchBookings';
import BookingButton from '../components/BookingButton';
import { BounceLoader } from 'react-spinners';
import "../App.css";

function Offerings() {
  const { bookings, error } = useFetchBookings();
  console.log("booooookings:", bookings);
  const [detailedBookings, setDetailedBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetailsForBookings = async () => {
      const bookingDetailsPromises = bookings
        .filter(booking => booking.instructorPhoneNumber) // Only include bookings with an instructorPhoneNumber
        .map(async (booking) => {
          try {
            console.log('Booking data:', booking);
            console.log('Offering ID:', booking.offeringId);
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
      setDetailedBookings(bookingDetails.filter(b => b.instructor)); // Filter out entries without an instructor
      console.log("Filtered booking details:", bookingDetails);

      // Set loading to false after all data is fetched
      setLoading(false);
    };

    if (bookings && bookings.length > 0) {
      fetchDetailsForBookings();
    }
  }, [bookings]);

  if (error) {
    return <div>Error loading bookings: {error.message}</div>;
  }

  return (
    <div>
      <h2>Offerings</h2>
      {loading ? (
        <div className="loading-spinner">
          <BounceLoader color="#033aff" />
          <p className='mt-2'>Loading...</p>
        </div>
      ) : (
        detailedBookings.map((booking) => (
          <div key={booking.id} className="viewOfferings">
            <h3>{booking.offering.lesson.type} LESSON</h3>
            <p>
              <b>Location</b>: {booking.offering?.location.name} {booking.offering?.location.space.type}, {booking.offering?.location.city} <br />
              <b>Day</b>: {booking.offering?.location.schedule.day}s from {booking.offering?.location.schedule.startDate} until {booking.offering?.location.schedule.endDate}<br />
              <b>Time</b>: {booking.offering?.location.schedule.startTime} - {booking.offering?.location.schedule.endTime} <br />
              <b>{booking.offering?.lesson.private ? "Private lesson" : "Group lesson"}</b> <br></br>
              <b>Instructor</b>: {booking.instructor?.name}
              {localStorage.getItem('role') === 'ADMIN' && (<><br></br><b>Instructor Phone Number:</b> {booking.instructor?.phoneNumber}</>)}
            </p>
            {console.log(booking.id)}
            {booking.offering?.lesson.private && booking.clientPhoneNumbers.length > 0 ? (
              <p className="text-red-500 font-bold text-center">Not available</p>
            ) : (
              <p className="text-center"><BookingButton booking={booking} /> </p>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Offerings;
