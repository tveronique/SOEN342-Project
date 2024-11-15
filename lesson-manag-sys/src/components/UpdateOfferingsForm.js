import { useState, useEffect } from "react";
import axios from "axios";  
import Button from 'react-bootstrap/Button';
import useFetchOfferings from "../hooks/useFetchOfferings";

const UpdateOfferingsForm = ({ offering, onClose, onUpdate }) => {
    const [lessonType, setLessonType] = useState(offering.lesson.type.toUpperCase());
    const [locationName, setLocationName] = useState(offering.location.name.toUpperCase());
    const [spaceType, setSpaceType] = useState(offering.location.space.type.toUpperCase());
    const [city, setCity] = useState(offering.location.city.toUpperCase());
    const [day, setDay] = useState(offering.location.schedule.day.toUpperCase());
    const [startTime, setStartTime] = useState(offering.location.schedule.startTime);
    const [endTime, setEndTime] = useState(offering.location.schedule.endTime);
    const [startDate, setStartDate]  = useState(offering.location.schedule.startDate);
    const [endDate, setEndDate] = useState(offering.location.schedule.endDate);
    const [isPrivate, setIsPrivate] = useState(offering.lesson.private);

    const [message, setMessage] = useState('');
    const existingOfferings= useFetchOfferings().offerings;
    console.log("blop",existingOfferings);
      
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Offering Object:", offering);
        console.log("Offering ID:", offering.id);

        if (new Date(startDate) > new Date(endDate)) {
            setMessage('End date cannot be before the start date.');
            return;
          }
        
          // Validate times
          if (startTime >= endTime) {
              setMessage('End time must be after start time.');
              return;
          }
      
         // Convert new offering dates and times to Date objects for comparison
         const newOfferingStart = new Date(`${startDate}T${startTime}`);
         const newOfferingEnd = new Date(`${endDate}T${endTime}`);
      
         // Check for overlapping offerings
         const isOverlapping = existingOfferings.some(offering => {
             const existingStart = new Date(`${offering.location.schedule.startDate}T${offering.location.schedule.startTime}`);
             const existingEnd = new Date(`${offering.location.schedule.endDate}T${offering.location.schedule.endTime}`);
            
             console.log(newOfferingStart);
             console.log(newOfferingEnd);
             console.log(existingStart);
             console.log(existingEnd);
             // Check if new offering overlaps with an existing one in the same location and space
             return (
                 offering.location.name === locationName &&
                 offering.location.city === city &&
                 offering.location.space.type === spaceType &&
                 offering.location.schedule.day === day 
                 &&
                 ((offering.location.schedule.startDate === startDate && offering.location.schedule.endDate === endDate)
                 || (offering.location.schedule.startDate > startDate && offering.location.schedule.endDate < endDate)
                 || (offering.location.schedule.startDate < startDate && offering.location.schedule.endDate > endDate)
                 || (offering.location.schedule.startDate < startDate && offering.location.schedule.endDate < endDate)
                 || (offering.location.schedule.startDate > startDate && offering.location.schedule.endDate > endDate)
                 )
                 &&
                 ((offering.location.schedule.startTime === startTime && offering.location.schedule.endTime === endTime)
                 || (offering.location.schedule.startTime < startTime && offering.location.schedule.endTime > endTime)
                 || (offering.location.schedule.startTime > startTime && offering.location.schedule.endTime < endTime)
                 || (offering.location.schedule.startTime > startTime && offering.location.schedule.endTime < endTime)
                 || (offering.location.schedule.startTime < startTime && offering.location.schedule.endTime > endTime)
                 )
             );
         });

        try {
            if (isOverlapping) {
                console.log(isOverlapping);
                setMessage('Error: An offering at this location overlaps with an existing offering.');
                return; // Prevent submission
            }

            const updatedOffering = {
                ...offering,
                lesson: { ...offering.lesson, type: lessonType, private: isPrivate },
                location: { 
                    ...offering.location, 
                    name: locationName,
                    city: city, 
                    space: { ...offering.location.space, type: spaceType }, 
                    schedule: { day, startTime, endTime, startDate, endDate }
                }
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

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <div className="form-group">
                <label className='form-group'>Lesson Type:</label>
                <input
                    type="text"
                    value={lessonType}
                    onChange={(e) => setLessonType(e.target.value.toUpperCase())}
                    className="mt-1 p-2 border rounded w-full"
                />
            </div>
            <div className="form-group">
                <label>Private Lesson:</label>
                <input
                    type="checkbox"
                    checked={isPrivate}
                    onChange={(e) => setIsPrivate(e.target.checked)}
                />
            </div>
            <div className="form-group">
                <label className="block text-gray-700">Space Type:</label>
                <input
                    type="text"
                    value={spaceType}
                    onChange={(e) => setSpaceType(e.target.value.toUpperCase())}
                    className="mt-1 p-2 border rounded w-full"
                />
            </div>
            <div className="form-group">
                <label className='form-group'>Location Name:</label>
                <input
                    type="text"
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value.toUpperCase())}
                    className="mt-1 p-2 border rounded w-full"
                />
            </div>
            <div className="form-group">
                <label className="block text-gray-700">City:</label>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value.toUpperCase())}
                    className="mt-1 p-2 border rounded w-full"
                />
            </div>
            <div className="form-group">
                <label className="block text-gray-700">Day:</label>
                <input
                    type="text"
                    value={day}
                    onChange={(e) => setDay(e.target.value.toUpperCase())}
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
            {message && <p className="mt-4 text-red-500">{message}</p>}
        </form>
    );
}

export default UpdateOfferingsForm;