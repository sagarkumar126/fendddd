import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'


const Footer = () => {
  return (
    <div className='footer' id='footer'>
      
     <div className='footer-content' >



      <div className="footer-content-left">

      <img src={assets.logo} alt=""/>
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>

       <div className='footer-social-icons'>

    <img src={assets.facebook_icon} alt="" />
    <img src={assets.twitter_icon} alt="" />
    <img src={assets.linkedin_icon} alt="" />

       </div>
      </div>






       <div className="footer-content-center">


              <h2>COMPANY</h2>

              <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delievery</li>
                <li>Privacy Policy</li>
              </ul>

       </div>




      <div className="footer-content-right"></div>

  <h2>GET IN TOUCH</h2>

  <ul>
  <li>+91-123-321</li>
<li>Contact@gmail.com</li>
  </ul>



     </div>
<hr/>
<p className='footer-copyright'>Copyright 2024 © Tomato.com - All Right Reserved</p>
    </div>
  )
}

export default Footer
