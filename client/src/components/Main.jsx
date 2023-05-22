import React from 'react';
import { Header, Home, Products, About } from './index';
import { Routes, Route } from 'react-router-dom';



const Main = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/products' element={<Products />}/>
        <Route path='/about' element={<About />}/>
      </Routes>
    </div>
  )
};



export default Main;