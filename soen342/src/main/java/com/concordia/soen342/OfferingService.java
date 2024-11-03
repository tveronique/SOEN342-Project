package com.concordia.soen342;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class OfferingService {
    @Autowired //use instead of new() because manually creating is not recommended in Spring, this instantiates this class for us
    private OfferingRepository offeringRepository;
    
    @Autowired
    private MongoTemplate mongoTemplate;

    public List<Offering> allOfferings(){
        return offeringRepository.findAll();
    }

    public Offering saveOffering(Offering offering) {
        return mongoTemplate.insert(offering);
    }

    public Optional<Offering> singleOfferingById(ObjectId id) {
        return offeringRepository.findById(id);
    }

    // public Offering updateOffering(ObjectId offeringId, Offering updatedOffering) {
    //     // Check if the offering exists
    //     Optional<Offering> existingOffering = offeringRepository.findById(offeringId);
    //     if (existingOffering.isPresent()) {
    //         Offering offeringToUpdate = existingOffering.get();

    //         // Update the fields of the existing offering
    //         offeringToUpdate.setLesson(updatedOffering.getLesson());
    //         offeringToUpdate.setLocation(updatedOffering.getLocation());
            
    //         // Save the updated offering
    //         return offeringRepository.save(offeringToUpdate);
    //     } else {
    //         throw new Exception("bad");
    //     }
    // }
}
