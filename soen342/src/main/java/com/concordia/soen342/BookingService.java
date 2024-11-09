package com.concordia.soen342;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

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

    public Booking addClientToBooking(ObjectId bookingId, String phoneNumber) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        booking.getClientPhoneNumbers().add(phoneNumber);
        return bookingRepository.save(booking);
    }
    
    public Booking removeClientFromBooking(ObjectId bookingId, String phoneNumber) {
        // Find the booking by ID
        Booking booking = bookingRepository.findById(bookingId)
            .orElseThrow(() -> new RuntimeException("Booking not found"));

        // Get the current list of client phone numbers
        Set<String> clientPhoneNumbers = booking.getClientPhoneNumbers();

        // Remove the phone number if it exists in the list
        if (clientPhoneNumbers.contains(phoneNumber)) {
            clientPhoneNumbers.remove(phoneNumber);
            booking.setClientPhoneNumbers(clientPhoneNumbers);  // Update the booking object
        } else {
            throw new RuntimeException("Phone number not found in booking's client list");
        }

        return bookingRepository.save(booking);
    } 
}