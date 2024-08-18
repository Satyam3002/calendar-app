import React, { useContext, useState } from 'react';
import { EventContext } from '../App';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const daysInMonth = (month, year) => new Date(year, month, 0).getDate();
const firstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

const CalendarView = () => {
  const { events } = useContext(EventContext);
  const [searchText, setSearchText] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [selectedDay, setSelectedDay] = useState(null);

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const numDays = daysInMonth(currentMonth + 1, currentYear);
  const startDay = firstDayOfMonth(currentMonth, currentYear);

  const filteredEvents = events.filter(event => {
    const titleMatch = event.title.toLowerCase().includes(searchText.toLowerCase());
    const dateMatch = new Date(event.date).getMonth() === currentMonth && new Date(event.date).getFullYear() === currentYear;
    const categoryMatch = filterCategory === 'All' || event.category === filterCategory;
    return titleMatch && dateMatch && categoryMatch;
  });

  const days = Array.from({ length: numDays }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: startDay }, () => null);

  const handleMonthChange = (direction) => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const handleDayClick = (day) => {
    setSelectedDay(day === selectedDay ? null : day);
  };

  const closeModal = () => {
    setSelectedDay(null);
  };

  return (
    <div className="calendar-view bg-gradient-to-r from-blue-100 to-blue-300 p-6 rounded-3xl shadow-2xl border border-blue-200 max-w-4xl mx-auto mt-10 relative">
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={() => handleMonthChange('prev')} 
          className="text-white hover:text-blue-300 transition duration-300 p-3 rounded-full bg-blue-600 hover:bg-blue-700"
        >
          &#9664;
        </button>
        <h1 className="text-4xl font-extrabold text-blue-900">
          {format(new Date(currentYear, currentMonth), 'MMMM yyyy')}
        </h1>
        <button 
          onClick={() => handleMonthChange('next')} 
          className="text-white hover:text-blue-300 transition duration-300 p-3 rounded-full bg-blue-600 hover:bg-blue-700"
        >
          &#9654;
        </button>
      </div>

      <div className="mb-8">
        <input
          type="text"
          placeholder="Search events..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full p-4 border border-blue-300 rounded-lg shadow-lg focus:outline-none focus:border-blue-500 transition duration-150 ease-in-out mb-4 bg-white"
        />

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="w-full p-4 border border-blue-300 rounded-lg shadow-lg focus:outline-none focus:border-blue-500 transition duration-150 ease-in-out bg-white"
        >
          <option value="All">All Categories</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-8 text-center">
        <div className="font-bold text-blue-600 bg-blue-200 p-2 rounded-lg">Sun</div>
        <div className="font-bold text-blue-600 bg-blue-200 p-2 rounded-lg">Mon</div>
        <div className="font-bold text-blue-600 bg-blue-200 p-2 rounded-lg">Tue</div>
        <div className="font-bold text-blue-600 bg-blue-200 p-2 rounded-lg">Wed</div>
        <div className="font-bold text-blue-600 bg-blue-200 p-2 rounded-lg">Thu</div>
        <div className="font-bold text-blue-600 bg-blue-200 p-2 rounded-lg">Fri</div>
        <div className="font-bold text-blue-600 bg-blue-200 p-2 rounded-lg">Sat</div>
        {emptyDays.map((_, index) => (
          <div key={`empty-${index}`} className="p-4"></div>
        ))}
        {days.map(day => {
          const dayEvents = filteredEvents.filter(event => new Date(event.date).getDate() === day);
          return (
            <div 
              key={day} 
              className={`relative flex flex-col items-center justify-between p-2 border border-blue-300 rounded-lg transition duration-300 ease-in-out ${
                day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear() ? 'bg-yellow-200 ring-2 ring-yellow-400' : 'hover:bg-blue-50'
              }`}
            >
              <div className="text-center font-semibold text-blue-900">{day}</div>
              {dayEvents.length > 0 && (
                <button 
                  onClick={() => handleDayClick(day)}
                  className="mt-2 px-2 py-1 text-xs text-blue-700 lg:bg-blue-100 lg:rounded-lg lg:shadow-md lg:hover:bg-blue-200 transition duration-150 ease-in-out"
                >
                  See Events
                </button>
              )}
            </div>
          );
        })}
      </div>
      <Link to="/add" className="mt-6 block text-center text-white bg-blue-700 p-4 rounded-lg hover:bg-blue-800 transition duration-300 shadow-lg">
        Add Event
      </Link>

      {selectedDay !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg relative">
            <button 
              onClick={closeModal}
              className="absolute top-2 right-2 text-black text-2xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Events for {selectedDay}/{currentMonth + 1}/{currentYear}</h2>
            <div className="flex flex-col space-y-2">
              {filteredEvents.filter(event => new Date(event.date).getDate() === selectedDay).map(event => (
                <Link 
                  key={event.id} 
                  to={`/event/${event.id}`} 
                  className={`block p-4 rounded-lg text-white text-center text-sm ${getCategoryColor(event.category)} shadow-md truncate`}
                >
                  {event.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


const getCategoryColor = (category) => {
  switch (category) {
    case 'Work':
      return 'bg-blue-500';
    case 'Personal':
      return 'bg-green-500';
    case 'Other':
      return 'bg-yellow-500';
    default:
      return 'bg-gray-300';
  }
};

export default CalendarView;
