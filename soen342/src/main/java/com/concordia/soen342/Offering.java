// this class & repo is connected to Instructors
package com.concordia.soen342;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "offerings")
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Offering{
    @Id
    private ObjectId id;
    private Location location;
    private Lesson lesson;
    
    public Offering(Location lo, Lesson le) {
        this.location = lo;
        this.lesson = le;
    }


    public ObjectId getId() {
        return this.id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public Location getLocation() {
        return this.location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public Lesson getLesson() {
        return this.lesson;
    }

    public void setLesson(Lesson lesson) {
        this.lesson = lesson;
    }

}