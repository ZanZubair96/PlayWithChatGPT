import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Home({ categories, addCategory, deleteCategory }) {
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      const newCategory = {
        id: newCategoryName.toLowerCase().replace(/\s+/g, '-'),
        name: newCategoryName,
        icon: '📁',
      };
      addCategory(newCategory);
      setNewCategoryName('');
    }
  };

  return (
    <div className="Home">
      <h1 className="text-3xl font-bold mb-6">Welcome to PeoplePixel</h1>
      <div className="mb-8">
        <input 
          type="text" 
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="New category name"
          className="px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          onClick={handleAddCategory}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Category
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div key={category.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between">
            <Link to={`/category/${category.id}`} className="text-center">
              <span className="text-4xl mb-2 block">{category.icon}</span>
              <p className="text-xl font-semibold">{category.name}</p>
            </Link>
            <button 
              onClick={() => deleteCategory(category.id)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;