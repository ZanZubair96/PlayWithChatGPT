import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import CategoryGrid from './components/CategoryGrid';
import CategoryView from './components/CategoryView';
import ContactView from './components/ContactView';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<CategoryGrid />} />
            <Route path="/category/:category" element={<CategoryView />} />
            <Route path="/category/:category/contact/:contactId" element={<ContactView />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;