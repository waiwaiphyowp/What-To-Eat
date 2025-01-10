import React from 'react';
import './Home.css';
import homePagePic from './homepagepic.jpeg';

const Home = () => {
  return (
    <div className="homeContainer">
      <img src={homePagePic} alt="homePagePic" className='homePagePic' />
      <div className="homeContent">
        
        <h1>Run Out of Cooking Ideas?</h1>
        <span>Worry no more! Discover fresh, easy to make recipes for any cravings.
              Our app helps you decide what to eat and guide you through cooking it yourself.
              Let's make mealtime great again!
        </span>
      </div>
    </div>
  );
}

export default Home;
