package com.concordia.soen342;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import java.util.Set;
import java.util.HashSet;

@Document(collection = "bookings")
public class Booking{
    @Id
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId id;

    private ObjectId offeringId;
    private String instructorPhoneNumber;
    private Set<String> clientPhoneNumbers = new HashSet<String>();

    public Booking(ObjectId offeringId, String instructorPhoneNumber) {
        this.offeringId = offeringId;
        this.instructorPhoneNumber = instructorPhoneNumber;
    }

    public Booking(){}

    public ObjectId getOfferingId() {
        return offeringId;

    }

    public void setOfferingId(ObjectId offeringId) {
        this.offeringId = offeringId;
    }

    public String getInstructorPhoneNumber() {
        return instructorPhoneNumber;
    }

    public void setInstructorPhoneNumber(String instructorPhoneNumber) {
        this.instructorPhoneNumber = instructorPhoneNumber;
    }

    public Set<String> getClientPhoneNumbers() {
        return clientPhoneNumbers;
    }

    public void setClientPhoneNumbers(Set<String> clientPhoneNumbers) {
        this.clientPhoneNumbers = clientPhoneNumbers;
    }

}

/*
 * Booking newBooking = new Booking();
 * newBooking.setInstructorId(instructor.id);
 * newBooking.setOfferingId(offering.id);
 */