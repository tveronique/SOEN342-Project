package com.concordia.soen342;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<Person, String> {
    Person findByPhoneNumber(long phoneNumber);
}
