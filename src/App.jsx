import React from 'react'
import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Favorite from './components/Favorite/Favorite'
import Home from './components/Home/Home'
import NavBar from './components/NavBar/NavBar'
import Search from './components/Search/Search'
import MealCategory from './components/MealCategory/MealCategory';

const App = () => {
  return (
    <>
      <div>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Search" element={<Search />} />
            <Route path="/MealCategory" element={<MealCategory />} /> 
            <Route path="/Favorite" element={<Favorite />} />
          </Routes>
        </Router>
      </div>
     
    </>
  )
}

export default App;

  
