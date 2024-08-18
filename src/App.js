import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CalendarView from './components/CalendarView';
import AddEvent from './components/AddEvent';
import EditEvent from './components/EditEvent';
import EventDetails from './components/EventDetails';

export const EventContext = React.createContext();

function App() {
  const [events, setEvents] = useState([]);

  return (
    <EventContext.Provider value={{ events, setEvents }}>
      <Router>
        <div className="min-h-screen bg-gray-100 p-6">
          <Routes>
            <Route path="/" element={<CalendarView />} />
            <Route path="/add" element={<AddEvent />} />
            <Route path="/edit/:id" element={<EditEvent />} />
            <Route path="/event/:id" element={<EventDetails />} />
          </Routes>
        </div>
      </Router>
    </EventContext.Provider>
  );
}

export default App;
