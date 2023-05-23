import React from 'react';
import Images from '../media';
import './Home.css';

const Home = () => {
  return (
    <div className='banner-container'>
        <img className='home-banner' src={Images.HomeBanner} alt='home'/>
        <button className='banner-butt'>SHOP</button>

    </div>
  )
};

export default Home