import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function Category({ contacts, addContact }) {
  const { categoryId } = useParams();
  const [newContactName, setNewContactName] = useState('');

  const handleAddContact = () => {
    if (newContactName.trim()) {
      const newContact = {
        id: Date.now(),
        name: newContactName,
        photo: '👤',
        category: categoryId,
        todos: [],
        reminders: [],
        finances: [],
      };
      addContact(newContact);
      setNewContactName('');
    }
  };

  const categoryContacts = contacts.filter(contact => contact.category === categoryId);

  return (
    <div className="Category">
      <h1 className="text-3xl font-bold mb-6">{categoryId.charAt(0).toUpperCase() + categoryId.slice(1)}</h1>
      <div className="mb-8">
        <input 
          type="text" 
          value={newContactName}
          onChange={(e) => setNewContactName(e.target.value)}
          placeholder="New contact name"
          className="px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          onClick={handleAddContact}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Contact
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {categoryContacts.map((contact) => (
          <Link key={contact.id} to={`/contact/${contact.id}`} className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition duration-300">
            <span className="text-4xl mb-2 block">{contact.photo}</span>
            <p className="text-lg font-semibold">{contact.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Category;