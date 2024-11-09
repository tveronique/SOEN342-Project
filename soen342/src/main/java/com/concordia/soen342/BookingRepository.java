package com.concordia.soen342;

import java.util.List;
//import java.util.Optional;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingRepository extends MongoRepository<Booking, ObjectId> {
    List<Booking> findByInstructorPhoneNumber(String instructorPhoneNumber);
}
