import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Box } from '@mui/material';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalDiningIcon from '@mui/icons-material/LocalDining';

// https://mui.com/material-ui/react-app-bar/ 

const NavBar = () => {

  return (
    // Navbar will stick to the top of the page as the user scrolls down
    <AppBar 
      position="sticky" 
      sx={{ 
        backgroundColor: "white", 
        boxShadow: "none"  
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* home */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <IconButton edge="start" color="primary">
              <OtherHousesIcon />
            </IconButton>
            <Typography variant="h6" color="primary">
              Home
            </Typography>
          </Link>
        </Box>
        
        {/* logo */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <LocalDiningIcon sx={{ fontSize: "40px", color: "#FF5722", mr: 1 }} />
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#FF5722" }}>
            What-To-Eat
          </Typography>
        </Box>

        {/* search */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Link to="/Search" style={{ textDecoration: "none" }}>
            <Button color="primary">
              Search
            </Button>
          </Link>

          {/* category */}
          <Link to="/MealCategory" style={{ textDecoration: "none", display: "flex" }}>
            <Button color="primary">
              Category
            </Button>
          </Link>

          {/* favorite */}
          <Link to="/Favorite" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <Button color="primary"><FavoriteIcon sx={{ color: "#FF5722"}}/> 
              Favorite
            </Button>
          </Link>
        </Box>
        
      </Toolbar>
    </AppBar>
  );
};

export default NavBar
