package com.concordia.soen342;
import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.data.mongodb.core.aggregation.VariableOperators.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/api/offerings")
@CrossOrigin(origins = "*")

public class OfferingController {
    @Autowired
    private OfferingRepository offeringRepository;

    @Autowired
    private OfferingService offeringService;

    // private final Administrator admin = Administrator.getAdmin("adminName", 1234567890L, "password");

    @PostMapping("/create")
    public ResponseEntity<String> createOffering(@RequestBody Map<String, String> formData) {
        
    // Extract data from formData
    String lessonType = formData.get("lessonType");
    boolean isPrivate = Boolean.parseBoolean(formData.get("isPrivate"));
    String spaceType = formData.get("spaceType");
    String locationName = formData.get("locationName");
    String city = formData.get("city");
    String day = formData.get("day");
    String startTime = formData.get("startTime");
    String endTime = formData.get("endTime");
    String startDate = formData.get("startDate");
    String endDate = formData.get("endDate");

    // Create Location and Lesson objects
    Space space = new Space(spaceType);
    Schedule schedule = new Schedule(day, startTime, endTime, startDate, endDate);
    Location location = new Location(locationName, city, space, schedule);
    Lesson lesson = new Lesson(isPrivate, lessonType);


    // Create the Offering object
    Offering offering = new Offering(location, lesson);
    System.out.println("Received offeringRequest: " + offering);

    // Save the offering using a service or repository (not shown here)
    offeringRepository.save(offering); // Assuming you have a repository to handle this

    return ResponseEntity.ok("Offering created successfully");
}

@GetMapping
    public ResponseEntity<List<Offering>> getAllOfferings() {
        return new ResponseEntity<List<Offering>>(offeringService.allOfferings(), HttpStatus.OK);
    }

}

    // // Space Creation Endpoint
    // @PostMapping("/spaces")
    // public ResponseEntity<Space> createSpace(@RequestBody String type) {
    //     Space createdSpace = admin.createSpace(type);
    //     return ResponseEntit[y.ok(createdSpace);
    // }

    // // Location Creation Endpoint
    // // @PostMapping("/locations")
    // // public ResponseEntity<Location> createLocation(@RequestBody Location location) {
    // //     Location createdLocation = admin.createLocation(location.getCity(), location.getSpace(), location.getSchedule());
    // //     return ResponseEntity.ok(createdLocation);
    // // }

    // // Lesson Creation Endpoint
    // @PostMapping("/lessons")
    // public ResponseEntity<Lesson> createLesson(@RequestBody Lesson lesson) {
    //     // Implement your lesson creation logic
    //     // Example: Saving lesson to the database (if you have a repo)
    //     return ResponseEntity.ok(lesson);
    // }

    // // Offering Creation Endpoint
    // @PostMapping("/offerings")
    // public ResponseEntity<Offering> createOffering(@RequestBody Offering offering) {
    //     Offering createdOffering = admin.createOffering(offering.getLocation(), offering.getLesson());
    //     return ResponseEntity.ok(createdOffering);
    // }
