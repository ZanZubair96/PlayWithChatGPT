import React from 'react';
import './ContactTile.css';

function ContactTile({ name, photo }) {
  const initials = name.split(' ').map(n => n[0]).join('');

  return (
    <div className="contact-tile">
      {photo ? (
        <img src={photo} alt={name} className="contact-photo" />
      ) : (
        <div className="contact-initials">{initials}</div>
      )}
      <p>{name}</p>
    </div>
  );
}

export default ContactTile;