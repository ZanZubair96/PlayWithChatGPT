import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <ul className="flex items-center justify-between">
          <li><Link to="/" className="text-2xl font-bold">PeoplePixel</Link></li>
          <li><Link to="/" className="hover:underline">Home</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;