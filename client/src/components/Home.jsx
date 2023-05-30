import React from 'react';
import Images from '../media';
import './Home.css';
import { useNavigate } from 'react-router';

const Home = () => {
  let navigate = useNavigate('');

  return (
    <>
      <div className='banner-container'>
        <img className='home-banner' src={Images.HomeBanner} alt='home' />
        <button onClick={() => { navigate("/shop") }} className='banner-butt'>SHOP</button>
      </div>
      <div className='categories-container'>
        <div className='category-container'>
          <img className='category-image' src={Images.CategoryOverEar} alt='category' />
          <div className='category-text'>
            <p>Headphones</p>
            <p>Experience immersive audio with our high-quality headphones.</p>
          </div>
        </div>
        <div className='category-container'>
          <img className='category-image' src={Images.CategorySpeaker} alt='category' />
          <div className='category-text'>
            <p>Speakers</p>
            <p>Elevate your sound system with our powerful speakers.</p>
          </div>
        </div>
        <div className='category-container'>
          <img className='category-image' src={Images.CategoryAccessories} alt='category' />
          <div className='category-text'>
            <p>Accessories</p>
            <p>Enhance your audio setup with our range of accessories.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
