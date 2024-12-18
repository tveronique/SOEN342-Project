import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import '../App.css';

const CreateOfferingForm = () => {
    const [formData, setFormData] = useState({
        lessonType: '',
        isPrivate: false,
        spaceType: '',
        locationName: '',
        city: '',
        day: '',
        startTime: '',
        endTime: '',
        startDate: '',
        endDate: ''
      });
    
    const [message, setMessage] = useState('');
    const [existingOfferings, setExistingOfferings] = useState([]);

    useEffect(() => {
      const fetchExistingOfferings = async () => {
          try {
            const response = await axios.get("/api/offerings");
            setExistingOfferings(response.data);
            console.log("Offering fetched successfully:", response.data);
          } catch (error) {
        console.error("Error fetching offering:", error);
      };
      };

      fetchExistingOfferings();
    }, [])

      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: type === 'checkbox' ? checked : value.toUpperCase(),
        }));
      };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      setMessage('End date cannot be before the start date.');
      return;
    }
  
    // Validate times
    if (formData.startTime >= formData.endTime) {
        setMessage('End time must be after start time.');
        return;
    }

   // Convert new offering dates and times to Date objects for comparison
   const newOfferingStart = new Date(`${formData.startDate}T${formData.startTime}`);
   const newOfferingEnd = new Date(`${formData.endDate}T${formData.endTime}`);

   // Check for overlapping offerings
   const isOverlapping = existingOfferings.some(offering => {
       const existingStart = new Date(`${offering.location.schedule.startDate}T${offering.location.schedule.startTime}`);
       const existingEnd = new Date(`${offering.location.schedule.endDate}T${offering.location.schedule.endTime}`);

       //Check if new offering overlaps with an existing one in the same location and space
       return (
           offering.location.name === formData.locationName &&
           offering.location.space.type === formData.spaceType &&
           offering.location.city === formData.city &&
           offering.location.schedule.day === formData.day 
           &&
           ((newOfferingStart === existingStart && newOfferingEnd === existingEnd)
           || (newOfferingStart < existingStart && newOfferingEnd > existingEnd)
           || (newOfferingStart > existingStart && newOfferingEnd < existingEnd)
           || (newOfferingStart > existingStart && existingEnd < newOfferingEnd)
           || (newOfferingStart < existingEnd && existingEnd > newOfferingEnd)
           )
       );
      
   });

    try {
      // Sends form data to the Spring Boot backend
      if (isOverlapping) {
        setMessage('Error: An offering at this location overlaps with an existing offering.');
        setFormData({
          lessonType: '',
          isPrivate: false,
          spaceType: '',
          locationName: '',
          city: '',
          day: '',
          startTime: '',
          endTime: '',
          startDate: '',
          endDate: ''
      });
        return; // Prevent submission
    }
      const response = await axios.post("/api/offerings/create", formData);
      console.log("Offering created successfully:", response.data);
            setMessage("Offering successfully added!");
            setFormData({
              lessonType: '',
              isPrivate: false,
              spaceType: '',
              locationName: '',
              city: '',
              day: '',
              startTime: '',
              endTime: '',
              startDate: '',
              endDate: ''
          });
    } catch (error) {
      console.error("Error creating offering:", error);
    };
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <label className='form-group'>Lesson Type:</label>
        <input
          type="text"
          name="lessonType"
          value={formData.lessonType}
          onChange={handleChange}
          required
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div className="form-group">
        <label>Private Lesson:</label>
        <input
          type="checkbox"
          name="isPrivate"
          checked={formData.isPrivate}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label className="block text-gray-700">Space Type:</label>
        <input
          type="text"
          name="spaceType"
          value={formData.spaceType}
          onChange={handleChange}
          required
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div className="form-group">
        <label className='form-group'>Location Name:</label>
        <input
          type="text"
          name="locationName"
          value={formData.locationName}
          onChange={handleChange}
          required
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div className="form-group">
        <label className="block text-gray-700">City:</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div className="form-group">
        <label className="block text-gray-700">Day:</label>
        <input
          type="text"
          name="day"
          value={formData.day}
          onChange={handleChange}
          required
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div className="form-group">
        <label className="block text-gray-700">Start Time:</label>
        <input
          type="time"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          required
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div className="form-group">
        <label className="block text-gray-700">End Time:</label>
        <input
          type="time"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
          required
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div className="form-group">
        <label className="block text-gray-700">Start Date:</label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div className="form-group">
        <label className="block text-gray-700">End Date:</label>
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          required
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <Button type="submit" variant="outline-primary" size="lg">Create Offering</Button>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </form>
  );
};
export default CreateOfferingForm;