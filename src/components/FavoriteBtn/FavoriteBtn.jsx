import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";  // Import useNavigate from React Router
import "./FavoriteBtn.css";

const FavoriteBtn = ({ favorites, removeFavorites }) => {
  const navigate = useNavigate();  // Initialize navigate function

  // Handle going back to a specific recipe page
  const handleBackToRecipe = (mealId) => {
    navigate(`/meal/${mealId}`);  // Navigate to the specific meal's details page
  };

  return (
    <div className="container">
      <h2>Favorites</h2>
      {favorites.length > 0 ? (
        <ul className="favoritesList">
          {favorites.map(({ idMeal, strMealThumb, strMeal }) => (
            <li key={idMeal} className="favoriteItem">
              <span className="favoriteText">{strMeal}</span>
              <img
                src={strMealThumb}
                alt={strMeal}
                className="favoriteImage"
              />

              {/* Back to recipe button */}
              <Button
                variant="outlined"
                color="primary"
                size="small"
                onClick={() => handleBackToRecipe(idMeal)}
                className="backButton"
              >
                Recipe
              </Button>

              {/* remove button */}
              <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={() => removeFavorites(idMeal)}
                className="removeButton"
                sx={{ ml: 2 }} 
              >
                Remove
              </Button>

              
            </li>
          ))}
        </ul>
      ) : (
        <p>No favorites added yet.</p>
      )}
    </div>
  );
};

export default FavoriteBtn;
