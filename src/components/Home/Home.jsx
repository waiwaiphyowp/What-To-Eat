import React from 'react';
import './Home.css';
import homePagePic from './homepagepic.jpeg';

const Home = () => {
  return (
    <div className="homeContainer">
      <img src={homePagePic} alt="homePagePic" className='homePagePic' />
      <div className="homeContent">
        
        <h1>Welcome to Our Website</h1>
        <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci nobis dolores, eum sed alias, harum quasi voluptates asperiores unde architecto pariatur enim tenetur libero iure deleniti neque placeat sunt illum.</span>
      </div>
    </div>
  );
}

export default Home;
