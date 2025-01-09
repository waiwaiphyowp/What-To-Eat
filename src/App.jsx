import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import FavoriteBtn from './components/FavoriteBtn/FavoriteBtn';
import Home from './components/Home/Home'
import NavBar from './components/NavBar/NavBar'
import Search from './components/Search/Search'
import MealCategory from './components/MealCategory/MealCategory';

const App = () => {
  const [favorites, setFavorites] = useState([]); 

  // add favorites
  const addToFavorites = (meal) => {
    if (!favorites.find((fav) => fav.idMeal === meal.idMeal)) {
      setFavorites([...favorites, meal]);
    }
  };

  return (
    <>
      <div>
        <Router>
          <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Search" element={<Search />} />
              <Route path="/MealCategory"
                element={<MealCategory addToFavorites={addToFavorites} />}
              />
              <Route path="/Favorite" element={<FavoriteBtn favorites={favorites} />} />
            </Routes>
        </Router>
      </div>
    </>
  );
};

export default App;
