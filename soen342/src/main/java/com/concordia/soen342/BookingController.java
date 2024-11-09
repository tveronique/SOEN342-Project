package com.concordia.soen342;

//import org.bson.types.ObjectId;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.mongodb.core.aggregation.VariableOperators.Map;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {
    
    @Autowired
    private BookingService bookingService;

    @Autowired
    private BookingRepository bookingRepository;

        // POST endpoint to create a booking
    @PostMapping("/create")
    public ResponseEntity<String> createNewBooking(@RequestBody Booking bookingRequest) {
        try {
            // Call service to create and save booking
            Booking booking = bookingService.createBooking(bookingRequest.getOfferingId(), bookingRequest.getInstructorPhoneNumber());
            System.out.println("Received booking Request: " + booking);

            bookingRepository.save(booking);
            return ResponseEntity.ok("Bookings created successfully");

        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
  
    @GetMapping
    public ResponseEntity<List<Booking>> getAllBookings() {
        return new ResponseEntity<List<Booking>>(bookingService.allBookings(), HttpStatus.OK);
    }
    
    @GetMapping("/booked/{phoneNumber}")
    public ResponseEntity<List<Booking>> getBookedOfferings(@PathVariable String phoneNumber) {
        try {
            List<Booking> bookings = bookingService.getBookingsByInstructorPhone(phoneNumber);
            return ResponseEntity.ok(bookings);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
