package com.concordia.soen342;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired //use instead of new() because manually creating is not recommended in Spring, this instantiates this class for us
    private UserRepository userRepository;

    public List<User> allUsers(){
        return userRepository.findAll();
    }

    // public Optional<User> singleUserById(ObjectId id) {
    //     return userRepository.findById(id);
    // }

    public Optional<User> singleUserByPhoneNumber(long phoneNumber) {
        return userRepository.findByPhoneNumber(phoneNumber);
    }
    // public Person registerUser(Person person) {
    //     return userRepository.save(person);
    // }
}