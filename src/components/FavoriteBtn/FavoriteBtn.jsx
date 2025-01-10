import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";  // Import useNavigate from React Router
import "./FavoriteBtn.css";

//https://medium.com/@bobjunior542/using-usenavigate-in-react-router-6-a-complete-guide-46f51403f430
//using useNavigate
const FavoriteBtn = ({ favorites, removeFavorites }) => {
  const navigate = useNavigate();  // Initialize navigate function

  // Handle going back to a specific recipe page
  const handleBackToRecipe = (mealId) => {
    navigate(`/meal/${mealId}`);  // Navigate to the specific meal's details page
  };

  return (
    <div className="container">
      <h2>My Favorites</h2>
      {favorites.length > 0 ? (
        <ul className="favoritesList">
          {favorites.map(({ idMeal, strMealThumb, strMeal }) => (
            <li key={idMeal} className="favoriteItem">
              <img
                src={strMealThumb}
                alt={strMeal}
                className="favoriteImage"
              />
              <span className="favoriteText">{strMeal}</span>
              
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
                // color="secondary"
                size="small"
                onClick={() => removeFavorites(idMeal)}
                className="removeButton"
                sx={{ ml: 2, backgroundColor: '#FF5722'}} 
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
