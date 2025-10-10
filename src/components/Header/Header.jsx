import React from 'react'
import './Header.css'
import { assets } from '../../assets/assets'

const Header = () => {
  return (
    <div className="header">
      <img src={assets.header_img} alt="Header" className="header-image" />

      <div className="header-contents">
        <h2>Order Your Favourite Food Here</h2>
        <p>Choose diverse of Food and End Your Cravings</p>
        <button>View Menu</button>
      </div>
    </div>
  )
}

export default Header
