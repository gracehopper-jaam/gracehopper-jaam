import React, { useState, useEffect } from 'react';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from the API
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCreateCategory = async () => {
    const newCategoryName = prompt('Enter a new category name:');
    const newCategoryDescription = prompt('Enter a new category description:');
    const newCategorySubcategory = prompt('Enter a new category subcategory:');

    if (newCategoryName && newCategoryDescription && newCategorySubcategory) {
      try {
        const response = await fetch('/api/categories', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: newCategoryName,
            description: newCategoryDescription,
            subcategory: newCategorySubcategory
          })
        });

        if (response.ok) {
          const createdCategory = await response.json();
          setCategories([...categories, createdCategory]);
        } else {
          console.error('Error creating category:', response.statusText);
        }
      } catch (error) {
        console.error('Error creating category:', error);
      }
    }
  };

  return (
    <div>
      <h2>Categories</h2>
      <button onClick={handleCreateCategory}>Create Category</button>
      {categories.map(category => (
        <div key={category.id}>
          <h3>{category.name}</h3>
          <p>{category.description}</p>
          <p>{category.subcategory}</p>
        </div>
      ))}
    </div>
  );
};

export default Categories;
