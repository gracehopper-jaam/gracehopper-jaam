import React from 'react';
import Images from '../media';
import './Home.css';

const Home = () => {
  return (
    <div className='banner-container'>
        <img className='home-banner' src={Images.HomeBanner} alt='home'/>

    </div>
  )
};

export default Home