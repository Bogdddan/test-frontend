import React, { useState } from 'react';
import { useCategory } from '../CategoryContext/CategoriesContext';
import './Categories.css'; // Імпортуйте стилі з файлу Categories.css

type CategoryProps = {
  category: Category;
};

function Category({ category }: CategoryProps) {
  const [newCategoryName, setNewCategoryName] = useState('');
  const { addCategory, removeCategory } = useCategory();
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  const handleAddCategory = () => {
    if (newCategoryName.trim() !== '') {
      addCategory(newCategoryName, category);
      setNewCategoryName('');
      setIsAddingCategory(false);
    }
  };

  const handleRemoveCategory = () => {
    removeCategory(id);
  }

  return (
    <div className="category">
      <div>
        {category.name}
        <button className='burronAdd' onClick={() => setIsAddingCategory(true)}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 10 10">
          <line x1="0" y1="5" x2="10" y2="5" stroke="black" stroke-width="1" />
          <line x1="5" y1="0" x2="5" y2="10" stroke="black" stroke-width="1" />
        </svg></button>
        <button onClick={handleRemoveCategory}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
          <path fill="black" d="M16.471,5.962c-0.365-0.066-0.709,0.176-0.774,0.538l-1.843,10.217H6.096L4.255,6.5c-0.066-0.362-0.42-0.603-0.775-0.538C3.117,6.027,2.876,6.375,2.942,6.737l1.94,10.765c0.058,0.318,0.334,0.549,0.657,0.549h8.872c0.323,0,0.6-0.23,0.656-0.549l1.941-10.765C17.074,6.375,16.833,6.027,16.471,5.962z"></path>
          <path fill="black" d="M16.594,3.804H3.406c-0.369,0-0.667,0.298-0.667,0.667s0.299,0.667,0.667,0.667h13.188c-0.369,0-0.667-0.298-0.667-0.667S16.963,3.804,16.594,3.804z"></path>
          <path fill="black" d="M9.25,3.284h1.501c0.368,0,0.667-0.298,0.667-0.667c0-0.369-0.299-0.667-0.667-0.667H9.25c-0.369,0-0.667,0.298-0.667,0.667C8.583,2.985,8.882,3.284,9.25,3.284z"></path>
        </svg>
        </button>
      </div>
      <div className="category-controls">
        {isAddingCategory && (
          <div>
            <input
              type="text"
              placeholder="Введіть назву нової категорії"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
            <button onClick={handleAddCategory}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
              <path fill="none" stroke="black" d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"></path>
            </svg></button>
          </div>
        )}
      </div>
      <div className="category-children">
        {category.children.map((child: { name: React.Key | null | undefined; }) => (
          <Category key={child.name} category={child} />
        ))}
      </div>
    </div>
  );
}

export default function Categories() {
  const { categories, addCategory } = useCategory();
  const [isEditingRootCategory, setIsEditingRootCategory] = useState(false);
  const [newRootCategoryName, setNewRootCategoryName] = useState('');

  const handleAddRootCategory = () => {
    if (isEditingRootCategory) {
      if (newRootCategoryName.trim() !== '') {
        addCategory(newRootCategoryName);
        setIsEditingRootCategory(false);
        setNewRootCategoryName('');
      }
    } else {
      setIsEditingRootCategory(true);
    }
  };

  return (
    <div className="categories">
      <div className='buttonAdd'>
        <div>Categories</div>
        {isEditingRootCategory ? (
          <>
            <input
              type="text"
              placeholder="Введіть назву категорії"
              value={newRootCategoryName}
              onChange={(e) => setNewRootCategoryName(e.target.value)}
            />
            <button className='buttonAdd' onClick={handleAddRootCategory}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
              <path fill="none" stroke="black" d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"></path>
            </svg>

            </button>
          </>
        ) : (
          <button className='buttonAdd' onClick={handleAddRootCategory}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 10 10">
            <line x1="0" y1="5" x2="10" y2="5" stroke="black" stroke-width="1" />
            <line x1="5" y1="0" x2="5" y2="10" stroke="black" stroke-width="1" />
          </svg>
          </button>
        )}
      </div>
      <div className="category-container">
        {categories.map((category) => (
          <Category key={category.name} category={category} />
        ))}
      </div>
    </div>
  );
}