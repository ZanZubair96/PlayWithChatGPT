import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './ReminderTab.css';

function ReminderTab({ contactId }) {
  const [reminders, setReminders] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    // Simulating API call to fetch reminders
    const fetchReminders = async () => {
      // Replace this with actual API call
      const response = await fetch(`/api/contacts/${contactId}/reminders`);
      const data = await response.json();
      setReminders(data);
    };

    fetchReminders();
  }, [contactId]);

  const addReminder = () => {
    // Implement add reminder functionality
  };

  const upcomingReminders = reminders.filter(reminder => new Date(reminder.date) >= new Date());

  return (
    <div className="reminder-tab">
      <button onClick={addReminder} className="add-button">Add New Reminder</button>
      <div className="reminder-content">
        <div className="calendar-view">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            tileContent={({ date }) => {
              const remindersForDate = reminders.filter(r => new Date(r.date).toDateString() === date.toDateString());
              return remindersForDate.length > 0 ? <p className="reminder-dot"></p> : null;
            }}
          />
        </div>
        <div className="reminder-list">
          <h3>Upcoming Reminders</h3>
          <ul>
            {upcomingReminders.map(reminder => (
              <li key={reminder.id} className="reminder-item">
                <p>{reminder.text}</p>
                <p>{new Date(reminder.date).toLocaleString()}</p>
                {reminder.recurrence && <p>Recurs: {reminder.recurrence}</p>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ReminderTab;