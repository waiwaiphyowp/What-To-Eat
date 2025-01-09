import React from 'react'

const FavoriteBtn = ({ favorites }) => {
  return (
    <div>
      <h2>Favorites</h2>
      {favorites.length > 0 ? (
        <ul>
          {favorites.map((meal) => (
            <li key={meal.idMeal}>
              {meal.strMeal}
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                style={{ width: "50px", marginLeft: "10px" }}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No favorites added yet.</p>
      )}
    </div>
  );
};

export default FavoriteBtn