import React, { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";
import "./Search.css"; 

const Search = () => {
  const [searchMeal, setSearchMeal] = useState(""); 
  const [searchResults, setSearchResults] = useState([]); 
  const [seeMoreRecipes, setSeeMoreRecipes] = useState(null); 

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
   
  const handleSeeMore = (meal) => {
    setSeeMoreRecipes(seeMoreRecipes?.idMeal === meal.idMeal ? null : meal); 
  };

  const recipesIngredients = (meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== "") {
        ingredients.push(`${measure ? measure : ""} ${ingredient}`);
      }
    }
    return ingredients;
  };

  //https://mui.com/system/getting-started/the-sx-prop/

  return (
    <Box className="searchContainer">

      {/* search input */}
      <Box className="searchInputContainer">
        <TextField
          label="Search for a meal"
          variant="outlined"
          value={searchMeal}
          onChange={(event) => setSearchMeal(event.target.value)} 
          className="searchInput" />
        
         {/* search button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          className="searchButton">
          Search
        </Button>
      </Box>

      {/* after search display the meal */}
      <Box className="resultsContainer">

        {searchResults.length > 0 &&
          searchResults.map((meal) => (
            <Box
              key={meal.idMeal}
              className="searchResultCard cardHoverEffect">
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  className="cardMedia"
                  image={meal.strMealThumb}
                  alt={meal.strMeal}
                />
                <CardContent className="cardContent">

                  <Typography variant="h6" className="cardTitle">
                    {meal.strMeal}
                  </Typography>

                  <Typography variant="body2" className="cardDescription">
                    {meal.strInstructions.slice(0, 50)}...
                  </Typography>

                  <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>

                    <Button
                      variant="text"
                      color="primary"
                      onClick={() => handleSeeMore(meal)}
                      className="seeMoreButton"
                    >
                      {seeMoreRecipes?.idMeal === meal.idMeal ? "Show Less" : "See More"}
                    </Button>
                  </Box>

                  {/* Instructions */}
                  {seeMoreRecipes?.idMeal === meal.idMeal && (
                    <Box className="instructionsSection">
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        <strong>Instructions:</strong>
                      </Typography>
                      <Typography variant="body2" color="text.secondary" className="instructionsText">
                        {meal.strInstructions}
                      </Typography>

                      {/* ingredient */}
                      <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mt: 2 }}>
                        <strong>Ingredients:</strong>
                      </Typography>
                      <ul className="ingredientsList">
                        {recipesIngredients(meal).map((ingredient, index) => (
                          <li key={index}>{ingredient}</li>
                        ))}
                      </ul>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default Search;