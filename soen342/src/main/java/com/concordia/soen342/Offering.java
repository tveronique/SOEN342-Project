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
    private String body;
    
    public Offering(String body) {
        this.body = body;
    }
}