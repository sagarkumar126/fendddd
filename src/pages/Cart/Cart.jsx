import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount,url } = useContext(StoreContext)
  const navigate = useNavigate()

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr />

        {food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div className="cart-items-title cart-items-item" key={item._id}>
                <img src={`${url}/uploads/${item.image}`} alt={item.name}/>

                <p>{item.name}</p>
                <p>₹{item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>₹{item.price * cartItems[item._id]}</p>
                <p className='cross' onClick={() => removeFromCart(item._id)}>x</p>
              </div>
            )
          }
          return null
        })}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>₹{getTotalCartAmount()}</p>
          </div>

          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>₹2</p>
          </div>

          <div className="cart-total-details">
            <b>Total</b>
            <b>₹{getTotalCartAmount() + 2}</b>
          </div>
        </div>

        <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
      </div>

      <div className="cart-promocode">
        <p>If you have a promo code, enter it here</p>
        <div className='cart-promocode-input'>
          <input type="text" placeholder="promo code" />
          <button>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default Cart
