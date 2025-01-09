import React from "react";
import { Button } from "@mui/material";
import "./FavoriteBtn.css";

const FavoriteBtn = ({ favorites, removeFavorites }) => {
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
              {/* remove button */}
              <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={() => removeFavorites(idMeal)}
                className="removeButton"
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
