import React, { useState, useEffect } from "react";
import "./MealCategory.css"

const MealCategory = ({}) => {
  const [categories, setCategories] = useState([]); // Store categories

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

  return (
    <div>
      <h1>Meal Categories</h1>
      <div className="mainContainer">
        {categories.map((category) => (
          <div 
            className="container"
            key={category.idCategory} >

            <img className="image"
              src={category.strCategoryThumb}
              alt={category.strCategory}
              
            />
            <p className="title">{category.strCategory}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealCategory;
