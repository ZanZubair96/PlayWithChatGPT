import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from './Header';
import ContactGrid from './ContactGrid';
import Pagination from './Pagination';
import './CategoryView.css';

function CategoryView() {
  const { category } = useParams();
  const [contacts, setContacts] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [filterText, setFilterText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 20;

  useEffect(() => {
    // Simulating API call to fetch contacts
    const fetchContacts = async () => {
      // Replace this with actual API call
      const response = await fetch(`/api/contacts?category=${category}`);
      const data = await response.json();
      setContacts(data);
    };

    fetchContacts();
  }, [category]);

  const sortedAndFilteredContacts = contacts
    .filter(contact => contact.name.toLowerCase().includes(filterText.toLowerCase()))
    .sort((a, b) => a[sortBy].localeCompare(b[sortBy]));

  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = sortedAndFilteredContacts.slice(indexOfFirstContact, indexOfLastContact);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="category-view">
      <Header />
      <main>
        <nav className="breadcrumb">
          <Link to="/">Home</Link> &gt; {category}
        </nav>
        <div className="controls">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="name">Sort by Name</option>
            <option value="email">Sort by Email</option>
          </select>
          <input
            type="text"
            placeholder="Filter contacts..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>
        <ContactGrid contacts={currentContacts} />
        <Pagination
          contactsPerPage={contactsPerPage}
          totalContacts={sortedAndFilteredContacts.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </main>
    </div>
  );
}

export default CategoryView;