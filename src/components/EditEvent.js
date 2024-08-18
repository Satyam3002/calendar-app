import React, { useContext, useState, useEffect } from 'react';
import { EventContext } from '../App';
import { useNavigate, useParams } from 'react-router-dom';

const EditEvent = () => {
  const { events, setEvents } = useContext(EventContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const event = events.find(event => event.id === parseInt(id));
    if (event) {
      setTitle(event.title);
      setDate(event.date);
      setDescription(event.description || '');
    }
  }, [id, events]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedEvents = events.map(event =>
      event.id === parseInt(id) ? { ...event, title, date, description } : event
    );
    setEvents(updatedEvents);
    navigate('/');
  };

  return (
    <div className="edit-event flex flex-col justify-center items-center  max-w-lg mx-auto bg-gradient-to-r  from-blue-50 to-blue-100 p-6 rounded-lg shadow-lg border border-gray-300">
      <h1 className="text-4xl font-extrabold mb-6 text-gray-800 text-center">Edit Event</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 bg-white"
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 bg-white"
          required
        />
        <textarea
          placeholder="Event Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 bg-white"
          rows="4"
        />
        <button type="submit" className="w-full  bg-teal-600 p-3 rounded-lg text-white hover:bg-teal-700 transition duration-200">
          Update Event
        </button>
      </form>
    </div>
  );
};

export default EditEvent;
