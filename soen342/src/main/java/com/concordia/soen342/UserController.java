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
import org.springframework.web.bind.annotation.DeleteMapping;
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

    @GetMapping("/phone/{phoneNumber}")
    public ResponseEntity<Optional<User>> getSingleUserByPhoneNumber(@PathVariable String phoneNumber) {
        return new ResponseEntity<Optional<User>>(userService.singleUserByPhoneNumber(phoneNumber), HttpStatus.OK);
    }
    
    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody User user) {
        try {
            userService.registerUser(user.getName(), user.getPhoneNumber(), user.getPassword(), user.getRole());
            LogInResponse userResponse = new LogInResponse(user.getPhoneNumber(), user.getRole());
            return ResponseEntity.ok(userResponse);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + e.getMessage());
        }
    }
    @PostMapping("/signup/instructor")
    public ResponseEntity<?> signUp(@RequestBody Instructor instructor) {
        try {
            userService.registerInstructor(instructor.getName(), instructor.getPhoneNumber(), instructor.getPassword(), instructor.getRole(), instructor.getSpecialization(), instructor.getAvailableCities());
            LogInResponse userResponse = new LogInResponse(instructor.getPhoneNumber(), instructor.getRole());
            return ResponseEntity.ok(userResponse);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/signup/guardian")
    public ResponseEntity<?> signUp(@RequestBody Guardian guardian) {
        try {
            userService.registerGuardian(guardian.getName(), guardian.getPhoneNumber(), guardian.getPassword(), guardian.getRole(), guardian.getChildName(), guardian.getChildAge(), guardian.getRelationship());
            LogInResponse userResponse = new LogInResponse(guardian.getPhoneNumber(), guardian.getRole());
            return ResponseEntity.ok(userResponse);
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

    @DeleteMapping("/delete/{phoneNumber}")
    public ResponseEntity<String> deleteUser(@PathVariable String phoneNumber) {
        if (userRepository.existsByPhoneNumber(phoneNumber)) {
            userRepository.deleteByPhoneNumber(phoneNumber);
            return ResponseEntity.ok("User deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }
    
}
