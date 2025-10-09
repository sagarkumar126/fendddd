import React, { useContext } from 'react'
import './FoodItem.css'
import { StoreContext } from '../../context/StoreContext'

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart,url } = useContext(StoreContext)

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-image" src={`${url}/uploads/${image}`} alt={name}/>

        {cartItems[id] ? (
          <div className="food-item-counter">
            <button onClick={() => removeFromCart(id)}>-</button>
            <p>{cartItems[id]}</p>
            <button onClick={() => addToCart(id)}>+</button>
          </div>
        ) : (
          <button className="add" onClick={() => addToCart(id)}>
            Add
          </button>
        )}
      </div>
      <div className="food-item-info">
        <p className="food-item-name">{name}</p>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">₹{price}</p>
      </div>
    </div>
  )
}

export default FoodItem




