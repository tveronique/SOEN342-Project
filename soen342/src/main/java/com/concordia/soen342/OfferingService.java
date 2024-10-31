package com.concordia.soen342;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import java.util.List;

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
}
