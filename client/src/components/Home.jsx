import React from 'react';
import Images from '../media';
import './Home.css';
import { useNavigate } from 'react-router';

const Home = () => {
  let navigate = useNavigate('');

  return (
    <>
      <div className='banner-container'>
          <img className='home-banner' src={Images.HomeBanner} alt='home'/>
          <button onClick={() => {navigate("/shop")}}className='banner-butt'>SHOP</button>
      </div>
      <div className='categories-container'>
        <div className='category-container'>
          <caption>Headphones</caption>
          <img className='category-image' src={Images.CategoryOverEar} alt='category'/>
        </div>
        <div className='category-container'>
          <caption>Speakers</caption>
          <img className='category-image' src={Images.CategorySpeaker} alt='category'/>
        </div>
        <div className='category-container'>
          <caption>Accessories</caption>
          <img className='category-image' src={Images.CategoryAccessories} alt='category'/>
        </div>
      </div>
        
    </>
    
  )
};

export default Home