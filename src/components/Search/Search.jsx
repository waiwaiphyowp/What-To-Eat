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
    <Box sx={{ p: 4 }}>

      {/* search input */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        <TextField
          label="Search for a meal"
          variant="outlined"
          value={searchMeal}
          onChange={(event) => setSearchMeal(event.target.value)} 
          sx={{ width: "60%", height: "56px", mr: 2 }} />
        
         {/* search button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          sx={{ height: "56px" }}>
          Search
        </Button>
      </Box>

      {/* after search display the meal */}
      <Box sx={{ 
        display: "flex", 
        flexWrap: "wrap", 
        justifyContent: "center" }}>

        {searchResults.length > 0 &&
          searchResults.map((meal) => (
            <Box
              key={meal.idMeal}
              sx={{
                maxWidth: 345,
                mx: 2, //margin-left/right
                mb: 3, //margin-bottom
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 6,
                  transition: "0.3s ease",
                },
              }}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={meal.strMealThumb}
                  alt={meal.strMeal}
                />
                <CardContent>

                  <Typography variant="h6" gutterBottom>
                    {meal.strMeal}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {/* <p>{meal.strInstructions}...</p> using slice to shorten recipes */}
                    {meal.strInstructions.slice(0, 50)}...
                  </Typography>

                  <Box sx={{ display: "flex", 
                  justifyContent: "space-between", 
                  mt: 1 }}>

                    <Button
                      variant="text"
                      color="primary"
                      onClick={() => handleSeeMore(meal)}
                    >
                      {seeMoreRecipes?.idMeal === meal.idMeal ? "Show Less" : "See More"}
                    </Button>
                  </Box>

                  {/* Instructions */}
                  {seeMoreRecipes?.idMeal === meal.idMeal && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        <strong>Instructions:</strong>
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {meal.strInstructions}
                      </Typography>

                      {/* ingredient */}
                      <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mt: 2 }}>
                        <strong>Ingredients:</strong>
                      </Typography>
                      <ul>
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