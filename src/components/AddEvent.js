import React, { useContext, useState } from 'react';
import { EventContext } from '../App';
import { useNavigate } from 'react-router-dom';

const AddEvent = () => {
  const { setEvents } = useContext(EventContext);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState(''); 
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !date) return; 
    const newEvent = { id: Date.now(), title, date, description, category: 'Work' }; 
    setEvents(prevEvents => [...prevEvents, newEvent]);
    navigate('/');
  };

  return (
    <div className="add-event max-w-lg mx-auto bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg shadow-lg border border-gray-300">
      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">Add Event</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <label htmlFor="title" className="block text-gray-700 mb-1">Event Title</label>
          <input
            id="title"
            type="text"
            placeholder="Enter event title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date" className="block text-gray-700 mb-1">Event Date</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description" className="block text-gray-700 mb-1">Event Description</label>
          <textarea
            id="description"
            placeholder="Add a brief description of the event"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
            rows="4"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition duration-200"
        >
          Add Event
        </button>
      </form>
    </div>
  );
};

export default AddEvent;
