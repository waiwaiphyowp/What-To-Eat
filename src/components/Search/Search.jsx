import React, { useState } from "react";

const Search = () => {
  const [searchMeal, setSearchMeal] = useState(""); 
  const [searchResults, setSearchResults] = useState([]); 

  const handleSearch = () => {
    if (searchMeal.trim() !== "") { 
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchMeal}`)
        .then((response) => response.json()) 
        .then((data) => {
          setSearchResults(data.meals || []); 
        }) 
        .catch((error) => {
          console.log("Error fetching search", error);
        });
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchMeal} 
        onChange={(event) => setSearchMeal(event.target.value)} 
        placeholder="Search for a meal..."
      />
      <button onClick={handleSearch}>Search</button>

      <div>
        {searchResults.length > 0 && (
          <ul>
            {searchResults.map((meal) => (
              <li key={meal.idMeal}>
                <h3>{meal.strMeal}</h3>
                <img src={meal.strMealThumb}/>
                <p>{meal.strInstructions}...</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Search;
