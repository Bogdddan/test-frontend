// App.tsx
import Draggable from "react-draggable";
import Categories from './Components/Categories/Categories';
import Header from './Components/Header/Header';
import { CategoryProvider } from './Components/CategoryContext/CategoriesContext';

function App() {
  return (
    <CategoryProvider>
      <Header/>
      <Draggable>
        <div className="App">
          <Categories />
        </div>
      </Draggable>
    </CategoryProvider>
  );
}

export default App;
