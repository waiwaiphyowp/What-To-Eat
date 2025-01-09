import React, { useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
} from "@mui/material";

const MealCategory = ({ addToFavorites }) => {
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [mealDetails, setMealDetails] = useState(null);

  // Fetch categories when the component loads
  // https://dev.to/antdp425/react-fetch-data-from-api-with-useeffect-27le
  // https://medium.com/@omar1.mayallo4/react-hooks-useeffect-problems-in-data-fetching-5e2abc37a1c9
  // useEffect & catch error
  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((response) => response.json())
      .then((data) => setCategories(data.categories))
      .catch((error) => console.error("Error fetching Category", error)); //when network or api error console will show error.
    }, []);

  // Fetch meals when the selected category changes
  useEffect(() => {
    if (selectedCategory) {
      fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`
      )
        .then((response) => response.json())
        .then((data) => setMeals(data.meals))
        .catch((error) => console.error("Error fetching meals", error));
      }
  }, [selectedCategory]);

  // when clicks on a meal and will update the state with the meal's details for display
  const handleMealClick = (mealId) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
      .then((response) => response.json())
      .then((data) => setMealDetails(data.meals[0]))
      .catch((error) => console.error("Error fetching meal details", error));
  };

  // back to categories
  const handleBackToCategories = () => {
    setMealDetails(null);
  };

  // Display meal details if a meal is selected
  if (mealDetails) {
    const ingredientsList = [];

    for (let i = 1; i <= 20; i++) {
      const ingredient = mealDetails[`strIngredient${i}`];
      const measure = mealDetails[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredientsList.push({ ingredient, measure });
      }
    }

    return (
      <Box sx={{ p: 4 }}>
        <Button
          variant="contained"
          onClick={handleBackToCategories}
          sx={{ mb: 2 }}
        >
          Back to Categories
        </Button>
        <Typography variant="h4" gutterBottom>
          {mealDetails.strMeal}
        </Typography>

        {/* instructions */}
        <CardMedia
          component="img"
          image={mealDetails.strMealThumb}
          alt={mealDetails.strMeal}
          sx={{ borderRadius: 2, mb: 2, width: "100%", maxHeight: 400 }}
        />
        <Typography variant="h6" gutterBottom>
          Instructions:
        </Typography>
        <Typography variant="body1" gutterBottom>
          {mealDetails.strInstructions}
        </Typography>

        {/* ingredients */}
        <Typography variant="h6" gutterBottom>
          Ingredients:
        </Typography>
        <ul>
          {ingredientsList.map((item, index) => (
            <li key={index}>
              {item.ingredient} - {item.measure}
            </li>
          ))}
        </ul>
        <Button
          onClick={() => addToFavorites(mealDetails)}
          variant="contained"
          color="secondary"
          sx={{ mt: 2 }}
        >
          Add to Favorites
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: 4,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom sx={{ width: "100%" }}>
        Meal Categories
      </Typography>

      {categories.map(({idCategory, strCategoryThumb, strCategory }) => (
        <Box
          key={idCategory}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 2,
            mx: 1,
            textAlign: "center",
          }}
        >
          <Card
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              overflow: "hidden",
              boxShadow: 3,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CardMedia
              component="img"
              image={strCategoryThumb}
              alt={strCategory}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Card>

          <CardContent sx={{ mt: 0.1 }}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                borderRadius: "20px",
                padding: "8px 16px",
                fontSize: "14px",
                textTransform: "none",
              }}
              onClick={() => setSelectedCategory(strCategory)}
            >
              {strCategory}
            </Button>
          </CardContent>
        </Box>
      ))}

      {selectedCategory && (
        <Box sx={{ p: 2, width: "100%", textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>
            {selectedCategory}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
              {meals.map(({idMeal, strMeal, strMealThumb}) => (
              <Card
                key={idMeal}
                sx={{ width: 150, margin: 2, cursor: "pointer" }}
                onClick={() => handleMealClick(idMeal)}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={strMealThumb}
                  alt={strMeal}
                  sx={{
                    objectFit: "cover",
                  }}
                />
                <CardContent>
                  <Typography variant="h7">{strMeal}</Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default MealCategory;