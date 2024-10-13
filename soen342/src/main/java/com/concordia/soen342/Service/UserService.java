package com.concordia.soen342.Service;

import com.concordia.soen342.Person;
import com.concordia.soen342.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired //use instead of new() because manually creating is not recommended in Spring
    private UserRepository userRepository;

    public Person registerUser(Person person) {
        return userRepository.save(person);
    }

    public Person findUserByPhoneNumber(long phoneNumber) {
        return userRepository.findByPhoneNumber(phoneNumber);
    }
}