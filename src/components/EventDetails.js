import React, { useContext } from 'react';
import { EventContext } from '../App';
import { useParams, useNavigate } from 'react-router-dom';

const EventDetails = () => {
  const { events, setEvents } = useContext(EventContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const event = events.find(event => event.id === parseInt(id));

  const handleDelete = () => {
    setEvents(events.filter(event => event.id !== parseInt(id)));
    navigate('/');
  };

  if (!event) return <p className="text-center text-gray-600">Event not found</p>;

  return (
    <div className="event-details max-w-lg mx-auto bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg shadow-lg border border-gray-300">
      <h1 className="text-4xl font-extrabold mb-4 text-gray-800">{event.title}</h1>
      <p className="text-xl mb-4 text-gray-700"><strong>Date:</strong> {event.date}</p>
      <p className="text-md mb-6 text-gray-600"><strong>Description:</strong> {event.description}</p>
      <div className="flex justify-between">
        <button
          onClick={() => navigate(`/edit/${id}`)}
          className="bg-teal-600 p-3 rounded-lg text-white hover:bg-teal-700 transition duration-200 flex items-center"
        >
          <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7V4a1 1 0 011-1h3m8 0h3a1 1 0 011 1v3m-7 14v-6m6 0H5a2 2 0 00-2 2v2a2 2 0 002 2h14a2 2 0 002-2v-2a2 2 0 00-2-2zm0-7l-3-3m0 0L10 9m0 0L7 6" />
          </svg>
          Edit Event
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 p-3 rounded-lg text-white hover:bg-red-700 transition duration-200 flex items-center"
        >
          <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 9l6 6 6-6M6 15l6-6 6 6" />
          </svg>
          Delete Event
        </button>
      </div>
    </div>
  );
};

export default EventDetails;
