package com.concordia.soen342;

import org.springframework.http.ResponseEntity;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/users")
@CrossOrigin(origins = "*")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return new ResponseEntity<List<User>>(userService.allUsers(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<User>> getSingleUserById(@PathVariable ObjectId id) {
        return new ResponseEntity<Optional<User>>(userService.singleUserById(id), HttpStatus.OK);
    }
    
    // @GetMapping("/{phoneNumber}")
    // public ResponseEntity<Optional<User>> getSingleUserByPhoneNumber(@PathVariable long phoneNumber) {
    //     return new ResponseEntity<Optional<User>>(userService.singleUserByPhoneNumber(phoneNumber), HttpStatus.OK);
    // }
    
}
