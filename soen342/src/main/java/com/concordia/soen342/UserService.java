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

    public Optional<User> singleUserById(ObjectId id) {
        return userRepository.findById(id);
    }

    public User registerUser(String name, long phoneNumber, String password, String role) {
        if (userRepository.findByPhoneNumber(phoneNumber).isPresent()) {
            throw new RuntimeException("Phone number already exists");
        }
        User user = new User();
        user.setName(name);
        user.setPassword(password);
        user.setRole(role);
        
        return userRepository.save(user);
    }

    // public Optional<User> singleUserByPhoneNumber(long phoneNumber) {
    //     return userRepository.findByPhoneNumber(phoneNumber);
    // }
    // public Person registerUser(Person person) {
    //     return userRepository.save(person);
    // }
}   
