package com.concordia.soen342;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class OfferingController {

    private final Administrator admin = Administrator.getAdmin("adminName", 1234567890L, "password");

    // Space Creation Endpoint
    @PostMapping("/spaces")
    public ResponseEntity<Space> createSpace(@RequestBody String type) {
        Space createdSpace = admin.createSpace(type);
        return ResponseEntity.ok(createdSpace);
    }

    // Location Creation Endpoint
    // @PostMapping("/locations")
    // public ResponseEntity<Location> createLocation(@RequestBody Location location) {
    //     Location createdLocation = admin.createLocation(location.getCity(), location.getSpace(), location.getSchedule());
    //     return ResponseEntity.ok(createdLocation);
    // }

    // Lesson Creation Endpoint
    @PostMapping("/lessons")
    public ResponseEntity<Lesson> createLesson(@RequestBody Lesson lesson) {
        // Implement your lesson creation logic
        // Example: Saving lesson to the database (if you have a repo)
        return ResponseEntity.ok(lesson);
    }

    // Offering Creation Endpoint
    @PostMapping("/offerings")
    public ResponseEntity<Offering> createOffering(@RequestBody Offering offering) {
        Offering createdOffering = admin.createOffering(offering.getLocation(), offering.getLesson());
        return ResponseEntity.ok(createdOffering);
    }
}