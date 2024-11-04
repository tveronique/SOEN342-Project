import { useState } from "react";
import axios from "axios";  
import Button from 'react-bootstrap/Button';

const UpdateOfferingsForm = ({ offering, onClose, onUpdate }) => {
    const [lessonType, setLessonType] = useState(offering.lesson.type);
    const [locationName, setLocationName] = useState(offering.location.name);
    const [spaceType, setSpaceType] = useState(offering.location.space.type);
    const[city, setCity] = useState(offering.location.city);
    const[day, setDay] = useState(offering.location.schedule.day);
    const[startTime, setStartTime] = useState(offering.location.schedule.startTime);
    const[endTime, setEndTime] = useState(offering.location.schedule.endTime);
    const[startDate, setStartDate]  = useState(offering.location.schedule.startDate);
    const[endDate, setEndDate] = useState(offering.location.schedule.endDate);
    const[isPrivate, setIsPrivate] = useState(offering.lesson.private);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Offering Object:", offering);
        console.log("Offering ID:", offering.id);

        try {
          const updatedOffering = {
              ...offering,
              lesson: { ...offering.lesson, type: lessonType, private: isPrivate },
              location: { ...offering.location, name: locationName, space: { ...offering.location.space, type: spaceType }, schedule: {...offering.location.schedule, day: day, startTime: startTime, endTime: endTime, startDate: startDate, endDate: endDate}}
          };

          const offeringId = offering.id ? offering.id : null;

          if (!offeringId) {
            console.error("Offering ID is undefined or null");
            return;
          }
          console.log("Updated offering:", updatedOffering);
          const response = await axios.put(`/api/offerings/${offeringId}`, updatedOffering);
          onUpdate(response.data);
          window.location.reload();
          onClose(); 
        } catch (error) {
            console.error("Error updating offering:", error);
        }
    };

    return(
        <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <label className='form-group'>Lesson Type:</label>
        <input
          type="text"
          value={lessonType}
          onChange={(e) => setLessonType(e.target.value)}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div className="form-group">
        <label>Private Lesson:</label>
        <input
          type="checkbox"
          value={isPrivate}
          checked={isPrivate}
          onChange={(e) => setIsPrivate(e.target.checked)}
        />
      </div>
      <div className="form-group">
        <label className="block text-gray-700">Space Type:</label>
        <input
          type="text"
          value={spaceType}
          onChange={(e) => setSpaceType(e.target.value)}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div className="form-group">
        <label className='form-group'>Location Name:</label>
        <input
          type="text"
          value={locationName}
          onChange={(e) => setLocationName(e.target.value)}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div className="form-group">
        <label className="block text-gray-700">City:</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div className="form-group">
        <label className="block text-gray-700">Day:</label>
        <input
          type="text"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div className="form-group">
        <label className="block text-gray-700">Start Time:</label>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div className="form-group">
        <label className="block text-gray-700">End Time:</label>
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div className="form-group">
        <label className="block text-gray-700">Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div className="form-group">
        <label className="block text-gray-700">End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <Button type="submit" variant="outline-primary" size="lg">Save</Button>
      <Button type="button" variant="outline-primary" size="lg" onClick={onClose}>Cancel</Button>
    </form>
    );
}
export default UpdateOfferingsForm;