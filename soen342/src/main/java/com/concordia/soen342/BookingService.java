package com.concordia.soen342;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {
    
    @Autowired //use instead of new() because manually creating is not recommended in Spring, this instantiates this class for us
    private BookingRepository bookingRepository;

    // Method to create and save a booking
    public Booking createBooking(ObjectId offeringId, String instructorPhoneNumber) {
        Booking booking = new Booking();

        booking.setOfferingId(offeringId);
        booking.setInstructorPhoneNumber(instructorPhoneNumber);

        return bookingRepository.save(booking);
    }

    public List<Booking> allBookings(){
        return bookingRepository.findAll();
    }

    public List<Booking> getBookingsByInstructorPhone(String phoneNumber) {
        return bookingRepository.findByInstructorPhoneNumber(phoneNumber);
    }
}
