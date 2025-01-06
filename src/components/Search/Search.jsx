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
          sx={{ width: "60%", height: "56px", mr: 2 }} /> {/*margin-right */}

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
                    {meal.strInstructions.slice(0, 100)}...
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default Search;
