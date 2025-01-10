import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import { Typography, Box, CardMedia, Button } from '@mui/material';

// https://refine.dev/blog/react-router-useparams/#how-to-use-the-useparams-hook
//https://api.reactrouter.com/dev/functions/react_router.useParams.html
// using useParams 
const MealDetail = () => {
  const { mealId } = useParams();  // Extract mealId from URL params
  const [mealDetails, setMealDetails] = useState(null);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
      .then((response) => response.json())
      .then((data) => setMealDetails(data.meals[0]))
      .catch((error) => console.error("Error fetching meal details", error));
  }, [mealId]);

  if (!mealDetails) {
    return <Typography>Loading...</Typography>;
  }

  const ingredientsList = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = mealDetails[`strIngredient${i}`];
    const measure = mealDetails[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredientsList.push({ ingredient, measure });
    }
  }

  const videoLink = mealDetails.strYoutube;
  
  return (
    <Box className="mealDetailContainer">
      {/* <Button variant="contained" color="secondary" sx={{ mb: 2 }}>
        Add to Favorites
      </Button> */}
      {/* Video Button */}
      {videoLink && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => window.open(videoLink, '_blank')}  // Opens the video link in a new tab
          sx={{ mt: 2 }}
        >
          Watch Recipe Video
        </Button>
      )}
      <Typography variant="h4" gutterBottom>
        {mealDetails.strMeal}
      </Typography>

      {/* instructions */}
      <CardMedia
        component="img"
        height="500"
        image={mealDetails.strMealThumb}
        alt={mealDetails.strMeal}
      />

      {/* ingredients */}
      <Typography variant="h6" gutterBottom className='ingredientTitle'>
        Ingredients:
      </Typography>
      <ul className="ingredientsList">
        {ingredientsList.map((item, index) => (
          <li key={index}>
            {item.ingredient} - {item.measure}
          </li>
        ))}
        <Typography variant="h6" gutterBottom className='instructionsRec'>
          Instructions:
        </Typography>
        <Typography variant="body1" gutterBottom>
          {mealDetails.strInstructions}
        </Typography>
      </ul>
    </Box>
  );
};

export default MealDetail;
