import React, { useState } from 'react';
import CategoryTile from './CategoryTile';
import './CategoryGrid.css';

function CategoryGrid() {
  const [categories, setCategories] = useState([
    { id: 'family', name: 'Family', icon: '👪', count: 5 },
    { id: 'friends', name: 'Friends', icon: '👥', count: 8 },
    { id: 'others', name: 'Others', icon: '📚', count: 3 },
  ]);

  const handleAddCategory = () => {
    const newCategoryName = prompt('Enter the name of the new category:');
    if (newCategoryName) {
      setCategories([...categories, {
        id: newCategoryName.toLowerCase(),
        name: newCategoryName,
        icon: '📁',
        count: 0
      }]);
    }
  };

  return (
    <div className="category-grid">
      {categories.map(category => (
        <CategoryTile key={category.id} {...category} />
      ))}
      <CategoryTile id="add-category" name="Add Category" icon="➕" onClick={handleAddCategory} />
    </div>
  );
}

export default CategoryGrid;