package com.concordia.soen342;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Vector;

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

    public User registerUser(String name, String phoneNumber, String password, String role) {
        if (userRepository.findByPhoneNumber(phoneNumber).isPresent()) {
            throw new RuntimeException("Phone number already exists");
        }
        if("ADMIN".equals(role)) {
            boolean adminExists = userRepository.existsByRole("ADMIN");
            System.out.println("Admin exists check result: " + adminExists);
            if (adminExists){
                throw new AdminAlreadyExistsException("An admin user already exists");
            }
        }
        User user = new User();

        user.setPhoneNumber(phoneNumber);
        user.setName(name);
        user.setPassword(password);
        user.setRole(role);

        return userRepository.save(user);
    }

    public Instructor registerInstructor(String name, String phoneNumber, String password, String role, Vector<String> specialization, Vector<String> availableCities) {
        if (userRepository.findByPhoneNumber(phoneNumber).isPresent()) {
            throw new RuntimeException("Phone number already exists");
        }
    
        Instructor instructor = new Instructor();

        instructor.setPhoneNumber(phoneNumber);
        instructor.setName(name);
        instructor.setPassword(password);
        instructor.setRole(role);
        instructor.setSpecialization(specialization);
        instructor.setAvailableCities(availableCities);

        return userRepository.save(instructor);
    }

    public Guardian registerGuardian(String name, String phoneNumber, String password, String role, String childName, int childAge, String relationship) {
        if (userRepository.findByPhoneNumber(phoneNumber).isPresent()) {
            throw new RuntimeException("Phone number already exists");
        }
    
        Guardian guardian = new Guardian();

        guardian.setPhoneNumber(phoneNumber);
        guardian.setName(name);
        guardian.setPassword(password);
        guardian.setRole(role);
        guardian.setChildName(childName);
        guardian.setChildAge(childAge);
        guardian.setRelationship(relationship);

        return userRepository.save(guardian);
    }

    public Optional<User> singleUserByPhoneNumber(String phoneNumber) {
        return userRepository.findByPhoneNumber(phoneNumber);
    }
    
    // public Person registerUser(Person person) {
    //     return userRepository.save(person);
    // }
}   
