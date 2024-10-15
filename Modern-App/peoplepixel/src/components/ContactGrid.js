import React from 'react';
import ContactTile from './ContactTile';
import './ContactGrid.css';

function ContactGrid({ contacts }) {
  return (
    <div className="contact-grid">
      {contacts.map(contact => (
        <ContactTile key={contact.id} {...contact} />
      ))}
      <div className="contact-tile add-contact">
        <span className="icon">+</span>
        <p>Add New Contact</p>
      </div>
    </div>
  );
}

export default ContactGrid;