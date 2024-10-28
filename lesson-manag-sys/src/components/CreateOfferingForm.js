import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import '../App.css';

const CreateOfferingForm = () => {
  const [lessonType, setLessonType] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [city, setCity] = useState('');
  const [spaceType, setSpaceType] = useState('');
  const [day, setDay] = useState('');
  const [startTime, setStartTime] = useState(''); // Changed from slots to startTime
  const [endTime, setEndTime] = useState(''); // Changed from slots to endTime
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (new Date(startDate) > new Date(endDate)) {
      setMessage('End date cannot be before the start date.');
      return;
    }

    if (startTime >= endTime) {
      setMessage('End time must be after start time.');
      return;
    }

    // Create space, location, lesson, and schedule objects
    try {
      const spaceResponse = await axios.post('/api/spaces', { type: spaceType });
      const locationResponse = await axios.post('/api/locations', { city, spaceId: spaceResponse.data.id });
      const scheduleResponse = await axios.post('/api/schedules', { day, startTime, endTime, startDate, endDate });
      const lessonResponse = await axios.post('/api/lessons', { type: lessonType, isPrivate });
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
        <label style={{ marginLeft: '10px' }}>
          <input
            type="checkbox"
            checked={!isPrivate}
            onChange={(e) => setIsPrivate(!e.target.checked)}
            className="mr-2"
          />
          Group Lesson
        </label>
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
        <label className="block text-gray-700">Start Time:</label>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div className="form-group">
        <label className="block text-gray-700">End Time:</label>
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
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