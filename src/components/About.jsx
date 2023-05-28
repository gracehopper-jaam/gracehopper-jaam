import React from 'react'
import './About.css';

const About = () => {
  return (
    <>
    <div id='about'>Hi there!</div>
    <h1 id='welcome'>Learn a bit about us...</h1>
    <p id='body'> JAAM is today’s principal brand for portable audio technology.  The company was founded in 2023 by Jason, Aubrey, Aparna, and Maisha. They were four unlikely souls who came together with one goal in mind: to spread music to the coding cohorts of the world. The top-tier quality of JAAM’s speakers and headphones astronomically expands the possibilities of sonic entertainment. 
The brand’s commitment to success brings liveliness, passion, and vibrancy to the listening experiences of music lovers worldwide. 
    </p>
  
  
    <form id='contact-form'>
      <div id='contact'>  Contact Us  </div> 
      {/* <div className="contact-us">   </div> */}
      <div> 
        <input placeholder="Name" type="text" required=""></input>
        <input placeholder="Email" type="email" name="customerEmail"></input>
        <input placeholder="Phone" type="tel" name="customerPhone" patter
        n="[0-9]{3}-[0-9]{3}-[0-9]{4}"></input>
      </div>

        <input placeholder="Message"></input>
      
    <button id="submit-button">Submit</button>
    </form> 
   
    <footer id='footer'>
      About Us <>
      </>
        </footer>
    </>
  )
}

export default About