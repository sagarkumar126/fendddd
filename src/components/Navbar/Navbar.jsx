import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home")
  const { getCartCount,token,setToken } = useContext(StoreContext)
const navigate =useNavigate();

 const logout = () =>{

  localStorage.removeItem("token");
  setToken("");

 }


  return (
    <div className='navbar'>
      <Link to='/'>
        <img src={assets.logo} alt="logo" />
      </Link>

      <ul className="navbar-menu">
        <li>
          <Link 
            to="/" 
            className={menu === "home" ? "active" : ""} 
            onClick={() => setMenu("home")}
          >
            Home
          </Link>
        </li>
        <li>
          <a 
            href="#explore-menu" 
            className={menu === "menu" ? "active" : ""} 
            onClick={() => setMenu("menu")}
          >
            Menu
          </a>
        </li>
        <li>
          <a 
            href="#app-download" 
            className={menu === "mobile-App" ? "active" : ""} 
            onClick={() => setMenu("mobile-App")}
          >
            Mobile-App
          </a>
        </li>
        <li>
          <a 
            href="#footer" 
            className={menu === "contact us" ? "active" : ""} 
            onClick={() => setMenu("contact us")}
          >
            Contact Us
          </a>
        </li>
      </ul>

      <div className="navbar-right">
        <img src={assets.search_icon} alt="search" className="search-icon" />

        <div className="navbar-search-icon">
          <Link to='/cart'>
            <img src={assets.basket_icon} alt="basket" />
            {getCartCount() > 0 && (
              <span className="cart-count">{getCartCount()}</span>
            )}
          </Link>
        </div>

        {!token?  <button onClick={() => setShowLogin(true)}>Sign-In</button>:
        
        <div className="navbar-profile">

          <img src={assets.profile_icon} alt="" />

          <ul className="nav-profile-dropdown">


         <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
         <hr/>
         <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>


          </ul>

        </div>
        }

      
      </div>
    </div>
  )
}

export default Navbar
