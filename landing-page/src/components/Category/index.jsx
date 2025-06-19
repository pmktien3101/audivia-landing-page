import React from 'react';
import './style.css';

const Category = ({ categories, activeCategory, onChange }) => {
    return (
        <div className="category-container">
            {categories.map(category => (
                <button
                    key={category.id}
                    className={`category-button ${activeCategory === category.id ? 'active' : ''}`}
                    onClick={() => onChange(category.id)}
                >
                    {category.name}
                </button>
            ))}
        </div>
    );
};

export default Category;