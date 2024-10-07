import React from 'react';
import './ContactSummary.css';

function ContactSummary({ contact }) {
  return (
    <div className="contact-summary">
      <div className="contact-photo">
        {contact.photo ? (
          <img src={contact.photo} alt={contact.name} />
        ) : (
          <div className="contact-initials">{contact.name.split(' ').map(n => n[0]).join('')}</div>
        )}
      </div>
      <div className="contact-info">
        <h2>{contact.name}</h2>
        <p>Email: {contact.email}</p>
        <p>Phone: {contact.phone}</p>
        {/* Add more contact details as needed */}
      </div>
    </div>
  );
}

export default ContactSummary;