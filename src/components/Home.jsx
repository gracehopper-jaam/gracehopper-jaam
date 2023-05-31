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
            <p>Experience sound like never before with JAAM's premium range of headphones. Our unique online store allows you to test the headphones before purchase, making us the first of our kind. Dive into immersive audio quality, crafted for audiophiles, music enthusiasts, and casual listeners alike. Discover your perfect match today.

</p>
          </div>
        </div>
        <div className='category-container'>
          <img className='category-image' src={Images.CategorySpeaker} alt='category' />
          <div className='category-text'>
            <p>Speakers</p>
            <p>Amplify your audio environment with JAAM's collection of top-notch speakers. We stand as the pioneering online platform offering a try-before-you-buy experience, ensuring you invest in the sound that moves you. Elevate your sound system with our powerful speakers, perfect for home entertainment, parties, and everyday use.

</p>
          </div>
        </div>
        <div className='category-container'>
          <img className='category-image' src={Images.CategoryAccessories} alt='category' />
          <div className='category-text'>
            <p>Accessories</p>
            <p>Maximize your audio experience with JAAM's wide array of accessories. Being the first online store offering try-before-you-buy, we ensure compatibility and convenience for our customers. From cables to stands, from cases to adaptors, we've got you covered. Enhance your audio setup and make the most of your music with our quality accessories.




</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
