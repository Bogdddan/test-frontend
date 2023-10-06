import { createContext, useContext, useState, ReactNode } from 'react';

export type Category = {
  id: number;
  name: string;
  children: Category[];
};

type CategoryContextType = {
  categories: Category[];
  addCategory: (categoryName: string, parentCategory?: Category) => void;
  removeCategory: (categoryId: number) => void;
};

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export function useCategory() {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategory must be used within a CategoryProvider');
  }
  return context;
}

type CategoryProviderProps = {
  children: ReactNode;
};

export function CategoryProvider({ children }: CategoryProviderProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [idCounter, setIdCounter] = useState(1); // Додано лічильник id

  const addCategory = (categoryName: string, parentCategory?: Category) => {
    const newCategory: Category = {
      name: categoryName, children: [],
      id: 0
    };
    setIdCounter(idCounter + 1); // Збільшуємо лічильник id

    if (parentCategory) {
      parentCategory.children.push(newCategory);
      setCategories([...categories]);
    } else {
      setCategories([...categories, newCategory]);
    }
  };

  const removeCategory = (categoryId: number) => {
    // Рекурсивно видаляємо категорію за її id
    const removeCategoryRecursive = (categoryList: any[]) => {
      return categoryList.filter((category: { id: number; children: any; }) => {
        if (category.id === categoryId) {
          return false; // Видаляємо категорію
        }
        // Рекурсивно викликаємо для дочірніх категорій
        if (category.children) {
          category.children = removeCategoryRecursive(category.children);
        }
        return true;
      });
    };

    const updatedCategories = removeCategoryRecursive([...categories]);
    setCategories(updatedCategories);
  };


  return (
    <CategoryContext.Provider value={{ categories, addCategory, removeCategory }}>
      {children}
    </CategoryContext.Provider>
  );
}
