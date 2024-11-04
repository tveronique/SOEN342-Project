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
    private ObjectId instructorId;
    private Set<ObjectId> clientIds = new HashSet<ObjectId>();

    public Booking(){}


    public ObjectId getId() {
        return this.id;
    }

    public ObjectId getOfferingId() {
        return this.offeringId;
    }

    public void setOfferingId(ObjectId offeringId) {
        this.offeringId = offeringId;
    }

    public ObjectId getInstructorId() {
        return this.instructorId;
    }

    public void setInstructorId(ObjectId instructorId) {
        this.instructorId = instructorId;
    }

    public Set<ObjectId> getClientIds() {
        return this.clientIds;
    }

    public void setClientIds(Set<ObjectId> clientIds) {
        this.clientIds = clientIds;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }
}

/*
 * Booking newBooking = new Booking();
 * newBooking.setInstructorId(instructor.id);
 * newBooking.setOfferingId(offering.id);
 */