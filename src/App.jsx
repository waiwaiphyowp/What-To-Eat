import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FavoriteBtn from './components/FavoriteBtn/FavoriteBtn';
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import Search from './components/Search/Search';
import MealCategory from './components/MealCategory/MealCategory';
import MealDetail from './components/MealDetail/MealDetail';  // New component for meal detail page

const App = () => {
  const [favorites, setFavorites] = useState([]); 

  // add favorites
  const addToFavorites = (meal) => {
    if (!favorites.find((fav) => fav.idMeal === meal.idMeal)) {
      setFavorites([...favorites, meal]);
    }
  };

  // remove favorites
  const removeFavorites = (mealId) => {
    setFavorites(favorites.filter((meal) => meal.idMeal !== mealId));
  };

  return (
    <>
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Search" element={<Search addToFavorites={addToFavorites} />} />
          <Route path="/MealCategory" 
          element={<MealCategory addToFavorites={addToFavorites} />} />
            <Route path="/Favorite" element={<FavoriteBtn favorites={favorites} 
            removeFavorites={removeFavorites} />} />

          {/* https://api.reactrouter.com/dev/functions/react_router.useParams.html */}
          {/* route for meal detail, using useParams */}
          <Route path="/meal/:mealId" element={<MealDetail />} />
        </Routes>
      </Router>
    </div>
    </>
  );
};

export default App;
