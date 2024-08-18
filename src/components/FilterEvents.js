import React, { useContext, useState } from 'react';
import { EventContext } from '../App';
import { Link } from 'react-router-dom';

const daysInMonth = (month, year) => new Date(year, month, 0).getDate();
const firstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

const CalendarView = () => {
  const { events } = useContext(EventContext);
  const [filter, setFilter] = useState('All'); // Filter state
  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();
  const numDays = daysInMonth(month + 1, year);
  const startDay = firstDayOfMonth(month, year);

  const days = Array.from({ length: numDays }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: startDay }, () => null);

  // Filtered events based on selected category
  const filteredEvents = filter === 'All' ? events : events.filter(event => event.category === filter);

  return (
    <div className="calendar-view bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Monthly Calendar</h1>
      <div className="mb-4">
        <label htmlFor="filter" className="mr-2 font-semibold">Filter by Category:</label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg"
        >
          <option value="All">All</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Others">Others</option>
        </select>
      </div>
      <div className="grid grid-cols-7 gap-2">
        <div className="font-bold text-center text-gray-700">Sun</div>
        <div className="font-bold text-center text-gray-700">Mon</div>
        <div className="font-bold text-center text-gray-700">Tue</div>
        <div className="font-bold text-center text-gray-700">Wed</div>
        <div className="font-bold text-center text-gray-700">Thu</div>
        <div className="font-bold text-center text-gray-700">Fri</div>
        <div className="font-bold text-center text-gray-700">Sat</div>
        {emptyDays.map((_, index) => (
          <div key={`empty-${index}`} className="p-2"></div>
        ))}
        {days.map(day => (
          <div key={day} className="relative p-3 border border-gray-300 rounded-lg hover:bg-gray-100">
            <div className="text-center font-semibold">{day}</div>
            {filteredEvents.filter(event => new Date(event.date).getDate() === day).map(event => (
              <Link key={event.id} to={`/event/${event.id}`} className="block mt-2 p-1 bg-blue-200 rounded text-blue-800 text-center text-sm">
                {event.title}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <Link to="/add" className="mt-6 block text-center text-white bg-blue-500 p-2 rounded-lg hover:bg-blue-600">
        Add Event
      </Link>
    </div>
  );
};

export default CalendarView;
