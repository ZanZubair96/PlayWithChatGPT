import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Contact({ contacts, updateContact }) {
  const { contactId } = useParams();
  const navigate = useNavigate();
  const contact = contacts.find(c => c.id === parseInt(contactId));

  const [newTodo, setNewTodo] = useState('');
  const [newReminder, setNewReminder] = useState('');
  const [newFinance, setNewFinance] = useState({ description: '', amount: '' });

  if (!contact) {
    return <div className="text-center text-xl mt-10">Contact not found</div>;
  }

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      const updatedContact = {
        ...contact,
        todos: [...contact.todos, newTodo],
      };
      updateContact(updatedContact);
      setNewTodo('');
    }
  };

  const handleRemoveTodo = (index) => {
    const updatedContact = {
      ...contact,
      todos: contact.todos.filter((_, i) => i !== index),
    };
    updateContact(updatedContact);
  };

  const handleAddReminder = () => {
    if (newReminder.trim()) {
      const updatedContact = {
        ...contact,
        reminders: [...contact.reminders, newReminder],
      };
      updateContact(updatedContact);
      setNewReminder('');
    }
  };

  const handleRemoveReminder = (index) => {
    const updatedContact = {
      ...contact,
      reminders: contact.reminders.filter((_, i) => i !== index),
    };
    updateContact(updatedContact);
  };

  const handleAddFinance = () => {
    if (newFinance.description.trim() && newFinance.amount) {
      const updatedContact = {
        ...contact,
        finances: [...contact.finances, newFinance],
      };
      updateContact(updatedContact);
      setNewFinance({ description: '', amount: '' });
    }
  };

  const handleRemoveFinance = (index) => {
    const updatedContact = {
      ...contact,
      finances: contact.finances.filter((_, i) => i !== index),
    };
    updateContact(updatedContact);
  };

  const inputClass = "flex-grow px-6 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300";
  const buttonClass = "px-6 py-3 bg-blue-400 text-white rounded-full hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 whitespace-nowrap";

  return (
    <div className="Contact max-w-6xl mx-auto p-4">
      <button 
        onClick={() => navigate(-1)} 
        className="mb-4 px-4 py-2 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400 transition duration-300"
      >
        &larr; Back
      </button>
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-3xl font-bold mb-2">{contact.name}</h1>
        <div className="contact-photo text-6xl mb-4 text-center">{contact.photo}</div>
        <p className="text-gray-600 text-center">Category: {contact.category}</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {/* Todos Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Todos</h2>
          <div className="flex mb-4">
            <input 
              type="text" 
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="New todo"
              className={inputClass}
            />
            <button 
              onClick={handleAddTodo}
              className={`${buttonClass} ml-2`}
            >
              Add
            </button>
          </div>
          <ul className="space-y-2">
            {contact.todos.map((todo, index) => (
              <li key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded-full">
                <span className="ml-4">{todo}</span>
                <button 
                  onClick={() => handleRemoveTodo(index)}
                  className="px-4 py-1 bg-red-400 text-white rounded-full hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300 whitespace-nowrap"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Reminders Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Reminders</h2>
          <div className="flex mb-4">
            <input 
              type="text" 
              value={newReminder}
              onChange={(e) => setNewReminder(e.target.value)}
              placeholder="New reminder"
              className={inputClass}
            />
            <button 
              onClick={handleAddReminder}
              className={`${buttonClass} ml-2`}
            >
              Add
            </button>
          </div>
          <ul className="space-y-2">
            {contact.reminders.map((reminder, index) => (
              <li key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded-full">
                <span className="ml-4">{reminder}</span>
                <button 
                  onClick={() => handleRemoveReminder(index)}
                  className="px-4 py-1 bg-red-400 text-white rounded-full hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300 whitespace-nowrap"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Finances Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Finances</h2>
          <div className="space-y-2 mb-4">
            <input 
              type="text" 
              value={newFinance.description}
              onChange={(e) => setNewFinance({...newFinance, description: e.target.value})}
              placeholder="Description"
              className={inputClass}
            />
            <div className="flex">
              <input 
                type="number" 
                value={newFinance.amount}
                onChange={(e) => setNewFinance({...newFinance, amount: e.target.value})}
                placeholder="Amount"
                className={inputClass}
              />
              <button 
                onClick={handleAddFinance}
                className={`${buttonClass} ml-2`}
              >
                Add
              </button>
            </div>
          </div>
          <ul className="space-y-2">
            {contact.finances.map((finance, index) => (
              <li key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded-full">
                <span className="ml-4">{finance.description}: ${finance.amount}</span>
                <button 
                  onClick={() => handleRemoveFinance(index)}
                  className="px-4 py-1 bg-red-400 text-white rounded-full hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300 whitespace-nowrap"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Contact;