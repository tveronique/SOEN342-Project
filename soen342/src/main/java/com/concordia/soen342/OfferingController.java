package com.concordia.soen342;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.concordia.soen342.dto.OfferingDTO;

@RestController
@RequestMapping("/api/offerings")
public class OfferingController {
    @Autowired
    private OfferingService offeringService;
    private OfferingRepository offeringRepository;

    // private final Administrator admin = Administrator.getAdmin("adminName", 1234567890L, "password");

    @PostMapping("/create")
        public ResponseEntity<?> createOffering(@RequestBody OfferingDTO dto) {
            try {
                // Create the objects using the data from the DTO
                Space space = new Space(dto.getSpaceType());
                Schedule schedule = new Schedule(dto.getDay(), dto.getStartTime(), dto.getEndTime(), dto.getStartDate(), dto.getEndDate());
                Location location = new Location(dto.getLocationName(), dto.getCity(), space, schedule);
                Lesson lesson = new Lesson(dto.getIsPrivate(), dto.getLessonType());

                Offering offering = new Offering(location, lesson);
                offeringRepository.save(offering);

                return ResponseEntity.ok(offering);
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating offering");
            }
        }
    }

    // // Space Creation Endpoint
    // @PostMapping("/spaces")
    // public ResponseEntity<Space> createSpace(@RequestBody String type) {
    //     Space createdSpace = admin.createSpace(type);
    //     return ResponseEntity.ok(createdSpace);
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