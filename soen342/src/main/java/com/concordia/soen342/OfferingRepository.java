package com.concordia.soen342;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OfferingRepository extends MongoRepository<Offering, ObjectId> {
}
