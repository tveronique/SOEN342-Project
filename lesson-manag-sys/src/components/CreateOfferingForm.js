import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import '../App.css'

const CreateOfferingForm = () => {
  const [lessonType, setLessonType] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [city, setCity] = useState('');
  const [spaceType, setSpaceType] = useState('');
  const [day, setDay] = useState('');
  const [slots, setSlots] = useState(['']); // Initial empty slot
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check date validity
    if (new Date(startDate) > new Date(endDate)) {
        setMessage('End date cannot be before the start date.');
        return;
    }

    try {
        // Create space
        const spaceResponse = await axios.post('/api/spaces', { type: spaceType });

        // Create location
        const locationResponse = await axios.post('/api/locations', {
            city,
            spaceId: spaceResponse.data.id, // Assuming you need the space ID
        });

        // Create schedule
        const scheduleResponse = await axios.post('/api/schedules', {
            day,
            slots,
            startDate,
            endDate,
        });

        // Create lesson
        const lessonResponse = await axios.post('/api/lessons', {
            type: lessonType,
            isPrivate,
        });

        // Create offering using the created IDs
        const offeringResponse = await axios.post('/api/offerings', {
            locationId: locationResponse.data.id,
            lessonId: lessonResponse.data.id,
            scheduleId: scheduleResponse.data.id,
        });

        setMessage(`Offering created successfully! ID: ${offeringResponse.data.id}`);
    } catch (error) {
        setMessage('Failed to create offering: ' + error.message);
    }
};

  const handleAddSlot = () => {
    setSlots([...slots, '']); // Add an empty slot field
  };

  const handleSlotChange = (index, value) => {
    const newSlots = [...slots];
    newSlots[index] = value; // Update the slot value
    setSlots(newSlots);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <label className='form-group'>Lesson Type:</label>
        <input
          type="text"
          value={lessonType}
          onChange={(e) => setLessonType(e.target.value)}
          required
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div>
        <label className="block text-gray-700">
          <input
            type="checkbox"
            checked={isPrivate}
            onChange={(e) => setIsPrivate(e.target.checked)}
            className="mr-2"
          />
          Private Lesson
        </label>
        <label style={{ marginLeft: '10px'}}>
          <input
            type="checkbox"
            checked={!isPrivate}
            onChange={(e) => setIsPrivate(!e.target.checked)}
            className="mr-2"
          />
          Group Lesson
        </label>
      </div>
      <div>
        
      </div>
      <div className="form-group">
        <label className="block text-gray-700">Space Type:</label>
        <input
          type="text"
          value={spaceType}
          onChange={(e) => setSpaceType(e.target.value)}
          required
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div className="form-group">
        <label className="block text-gray-700">City:</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div className="form-group">
        <label className="block text-gray-700">Day:</label>
        <input
          type="text"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          required
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div className="form-group">
        <label className="block text-gray-700">Slots:</label>
        {slots.map((slot, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              value={slot}
              onChange={(e) => handleSlotChange(index, e.target.value)}
              placeholder={`Slot ${index + 1}`}
              required
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
        ))}
        <Button type="button" onClick={handleAddSlot} variant="primary">
          Add Slot
        </Button>
      </div>
      <div className="form-group">
        <label className="block text-gray-700">Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div className="form-group">
        <label className="block text-gray-700">End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
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
