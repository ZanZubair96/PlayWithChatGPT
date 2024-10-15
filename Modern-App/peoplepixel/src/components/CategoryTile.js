import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryTile.css';

function CategoryTile({ id, name, icon, count, onClick }) {
  if (onClick) {
    return (
      <div className="category-tile" id={id} onClick={onClick}>
        <span className="icon">{icon}</span>
        <h2>{name}</h2>
        {count !== undefined && <p>{count} contacts</p>}
      </div>
    );
  }

  return (
    <Link to={`/category/${id}`} className="category-tile" id={id}>
      <span className="icon">{icon}</span>
      <h2>{name}</h2>
      {count !== undefined && <p>{count} contacts</p>}
    </Link>
  );
}

export default CategoryTile;