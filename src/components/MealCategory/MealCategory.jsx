import React, { useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
} from "@mui/material";

const MealCategory = () => {
  const [categories, setCategories] = useState([]); 
  const [meals, setMeals] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState(null); 

   // Fetch categories when the component loads
  // https://dev.to/antdp425/react-fetch-data-from-api-with-useeffect-27le
  // https://medium.com/@omar1.mayallo4/react-hooks-useeffect-problems-in-data-fetching-5e2abc37a1c9
  // useEffect & catch error
  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((response) => response.json()) 
      .then((data) => {
        // console.log("Fetch data:",data); //checking category data 
        setCategories(data.categories);
      })
      .catch((error) => console.error("Error fetching Category", error)) //when network or api error console will show error.
  }, []);

  // Fetch meals when the selected category changes
  useEffect(() => {
    if (selectedCategory) {
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`)
        .then((response) => response.json())
        .then((data) => {
          setMeals(data.meals);
        })
        .catch((error) => console.error("Error fetching meals", error));
    }
  }, [selectedCategory]);

  return (
    <Box sx={{ p: 4, 
    display: "flex", 
    flexWrap: "wrap", 
    justifyContent: "center" }}>
      <Typography variant="h4" 
      align="center" 
      gutterBottom sx={{ width: "100%" }}>
        Meal Categories
      </Typography>

      {categories.map((category) => (
        <Box
          key={category.idCategory}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 2,
            mx: 1,
            textAlign: "center",
          }}>

          {/* layout of card */}
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
            }}>

            <CardMedia
              component="img"
              image={category.strCategoryThumb}
              alt={category.strCategory}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}/>
          </Card>

          <CardContent sx={{ mt: 0.1 }}> {/*space between card and button */}
             {/* button design */}
            <Button
              variant="contained"
              color="primary"
              sx={{
                borderRadius: "20px",
                padding: "8px 16px",
                fontSize: "14px",
                textTransform: "none",
              }} onClick={() => setSelectedCategory(category.strCategory)}>

              {category.strCategory}
            </Button>
          </CardContent>
        </Box>
      ))}
    
      {selectedCategory && (
        <Box sx={{ p: 2, width: "100%", textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>
            {selectedCategory}
          </Typography>

          <Box sx={{ display: "flex", 
                    flexWrap: "wrap", 
                    justifyContent: "center" }}>
            {meals.map((meal) => (
              <Card key={meal.idMeal} sx={{ width: 150, margin: 2 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={meal.strMealThumb}
                  alt={meal.strMeal}
                  sx={{
                    objectFit: "cover",
                  }}
                />
                <CardContent>
                  {/* meal's title */}
                  <Typography variant="h7">{meal.strMeal}</Typography>
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
