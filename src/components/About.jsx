import React from 'react'
import './About.css';
import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router-dom';

const About = () => {
  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    emailjs.sendForm('service_vakzyf6', 'template_gqb0hwx', 'form', 'z-bjWzEqmRLp6hIp8')
    .then((result) => {
      console.log(result.text);
    }, 
    (error) => {
      console.log(error.text);
    });

    window.alert('Your message has been sent to the JAAM Team!');
    navigate('/');
  }


  return (
    <>
    <div id='about'>Hi there!</div>
    <h1 id='welcome'>Learn a bit about us..</h1>
    <p id='body'>JAAM is today’s principal brand for portable audio technology.  The company was founded in 2023 by Jason, Aubrey, Aparna, and Maisha. They were four unlikely souls who came together with one goal in mind: to spread music to the coding cohorts of the world. The top-tier quality of JAAM’s speakers and headphones astronomically expands the possibilities of sonic entertainment. The brand’s commitment to success brings liveliness, passion, and vibrancy to the listening experiences of music lovers worldwide. 
    </p>
  
    <div id='contact'>Contact Us</div>
    <form id='contact-form' onSubmit={handleSubmit}> 
      <input placeholder="Name" type="text" name='name' required></input>
      <input placeholder="Email" type="email" name='email' required></input>
      <input placeholder="Phone" type="tel" name="message" required></input>
      <button id="submit-button">Submit</button>
    </form> 
    </>
  )
}

export default About