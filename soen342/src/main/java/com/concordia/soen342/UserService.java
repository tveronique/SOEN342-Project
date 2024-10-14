package com.concordia.soen342;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired //use instead of new() because manually creating is not recommended in Spring, this instantiates this class for us
    private UserRepository userRepository;

    // public Person registerUser(Person person) {
    //     return userRepository.save(person);
    // }

    // public Person findUserByPhoneNumber(long phoneNumber) {
    //     return userRepository.findByPhoneNumber(phoneNumber);
    // }
    public List<User> getAllMovies(){
        return userRepository.findAll();
    }
}