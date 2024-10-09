import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Category from './pages/Category';
import Contact from './pages/Contact';

const API_URL = 'http://localhost:5001/api';

function App() {
  const [categories, setCategories] = useState([]);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch(`${API_URL}/data`);
    const data = await response.json();
    setCategories(data.categories);
    setContacts(data.contacts);
  };

  const addCategory = async (newCategory) => {
    const response = await fetch(`${API_URL}/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCategory),
    });
    const data = await response.json();
    setCategories([...categories, data]);
  };

  const deleteCategory = async (categoryId) => {
    await fetch(`${API_URL}/categories/${categoryId}`, {
      method: 'DELETE',
    });
    setCategories(categories.filter(category => category.id !== categoryId));
    setContacts(contacts.filter(contact => contact.category !== categoryId));
  };

  const addContact = async (newContact) => {
    const response = await fetch(`${API_URL}/contacts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newContact),
    });
    const data = await response.json();
    setContacts([...contacts, data]);
  };

  const updateContact = async (updatedContact) => {
    const response = await fetch(`${API_URL}/contacts/${updatedContact.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedContact),
    });
    const data = await response.json();
    setContacts(contacts.map(contact => 
      contact.id === data.id ? data : contact
    ));
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home categories={categories} addCategory={addCategory} deleteCategory={deleteCategory} />} />
            <Route path="/category/:categoryId" element={<Category contacts={contacts} addContact={addContact} />} />
            <Route path="/contact/:contactId" element={<Contact contacts={contacts} updateContact={updateContact} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;