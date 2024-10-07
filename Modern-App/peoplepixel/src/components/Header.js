import React from 'react';
import './Header.css';

function Header() {
  return (
    <header>
      <div className="logo">PeoplePixel</div>
      <div className="search-bar">
        <input type="text" placeholder="Search contacts..." />
        <button type="button">🔍</button>
      </div>
      <div className="user-profile">
        👤
      </div>
    </header>
  );
}

export default Header;