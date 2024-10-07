import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from './Header';
import ContactSummary from './ContactSummary';
import TodoTab from './TodoTab';
import ReminderTab from './ReminderTab';
import FinanceTab from './FinanceTab';
import './ContactView.css';

function ContactView() {
  const { category, contactId } = useParams();
  const [contact, setContact] = useState(null);
  const [activeTab, setActiveTab] = useState('todo');

  useEffect(() => {
    // Simulating API call to fetch contact details
    const fetchContact = async () => {
      // Replace this with actual API call
      const response = await fetch(`/api/contacts/${contactId}`);
      const data = await response.json();
      setContact(data);
    };

    fetchContact();
  }, [contactId]);

  if (!contact) {
    return <div>Loading...</div>;
  }

  return (
    <div className="contact-view">
      <Header />
      <main>
        <nav className="breadcrumb">
          <Link to="/">Home</Link> &gt; <Link to={`/category/${category}`}>{category}</Link> &gt; {contact.name}
        </nav>
        <ContactSummary contact={contact} />
        <div className="tab-bar">
          <button onClick={() => setActiveTab('todo')} className={activeTab === 'todo' ? 'active' : ''}>Todo</button>
          <button onClick={() => setActiveTab('reminder')} className={activeTab === 'reminder' ? 'active' : ''}>Reminder</button>
          <button onClick={() => setActiveTab('finance')} className={activeTab === 'finance' ? 'active' : ''}>Finance</button>
        </div>
        <div className="tab-content">
          {activeTab === 'todo' && <TodoTab contactId={contactId} />}
          {activeTab === 'reminder' && <ReminderTab contactId={contactId} />}
          {activeTab === 'finance' && <FinanceTab contactId={contactId} />}
        </div>
      </main>
    </div>
  );
}

export default ContactView;