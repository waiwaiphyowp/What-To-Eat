import React from 'react'
import { Link } from 'react-router-dom'
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';

const NavBar = () => {
  
  return (
    <div>
      <Link to="/"><OtherHousesIcon/>Home</Link>
      <Link to="/Search">
        <SearchIcon/>
        <Button>Search</Button>
      </Link>
      <Link to="/MealCategory"><Button>Category</Button></Link>
      <Link to="/Favorite"><FavoriteIcon/>Favorite</Link>
    </div>
  )
}

export default NavBar