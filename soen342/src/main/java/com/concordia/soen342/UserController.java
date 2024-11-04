package com.concordia.soen342;

import org.springframework.http.ResponseEntity;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import java.util.Map;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return new ResponseEntity<List<User>>(userService.allUsers(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<User>> getSingleUserById(@PathVariable ObjectId id) {
        return new ResponseEntity<Optional<User>>(userService.singleUserById(id), HttpStatus.OK);
    }
    
    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody User user) {
        try {
            userService.registerUser(user.getName(), user.getPhoneNumber(), user.getPassword(), user.getRole());
            return ResponseEntity.ok("User signed up successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + e.getMessage());
        }
    }

    // @PostMapping("/login")
    // public ResponseEntity<?> login() {
    //     // Spring Security handles authentication automatically here
    //     return ResponseEntity.ok("User logged in successfully");
    // }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> formData) {
        String phoneNumber = formData.get("phoneNumber");
        String password = formData.get("password");

        // Validate input
        if (phoneNumber == null || password == null) {
            return ResponseEntity.badRequest().body("Phone number and password are required");
        }

        // Find user by phone number
        Optional<User> userOpt = userRepository.findByPhoneNumber(phoneNumber);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (user.getPassword().equals(password)) { 
                LogInResponse userResponse = new LogInResponse(user.getPhoneNumber(), user.getRole());
                return ResponseEntity.ok(userResponse);
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid phone number or password");
    }
    
}
