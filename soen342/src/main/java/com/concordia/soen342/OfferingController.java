package com.concordia.soen342;
import org.bson.types.ObjectId;
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

@GetMapping("/{id}")
public ResponseEntity<Offering> getOfferingById(@PathVariable ObjectId id) {
    Offering offering = offeringService.singleOfferingById(id).orElse(null);
    if (offering == null) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(offering);
    }
    return ResponseEntity.ok(offering);
}

@PutMapping("/{id}")
public ResponseEntity<Offering> updateOffering(@PathVariable ObjectId id, @RequestBody Offering updatedOffering) {
    Offering existingOffering = offeringService.singleOfferingById(id).orElse(null);
    if (existingOffering == null) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(existingOffering);
    }

    // Update the existing offering
    existingOffering.setLocation(updatedOffering.getLocation());
    existingOffering.setLesson(updatedOffering.getLesson());
    
    // Save the updated offering
    Offering newUpdateOffering = offeringRepository.save(existingOffering);

    return ResponseEntity.ok(newUpdateOffering);
}

@DeleteMapping("/delete/{id}")
public ResponseEntity<String> deleteOffering(@PathVariable ObjectId id) {
    if (offeringRepository.existsById(id)) {
        offeringRepository.deleteById(id);
        return ResponseEntity.ok("Offering deleted successfully");
    } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Offering not found");
    }
}

}   
