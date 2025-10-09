import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./PlaceOrder.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) navigate("/cart");
  }, [token, navigate, getTotalCartAmount]);

  const onChangeHandler = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    const orderItems = food_list
      .filter((f) => cartItems[f._id] > 0)
      .map((f) => ({ ...f, quantity: cartItems[f._id] }));

    if (orderItems.length === 0) {
      alert("No items in cart!");
      return;
    }

    try {
      const res = await axios.post(
        `${url}/api/order/place`,
        {
          address: data,
          items: orderItems,
          amount: getTotalCartAmount() + 2,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ fixed header
          },
        }
      );

      if (res.data.success) {
        window.location.replace(res.data.session_url);
      } else {
        alert(res.data.message || "Error placing order");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Info</p>
        <div className="multi-fields">
          <input
            required
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First Name"
          />
          <input
            required
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input
          required
          name="email"
          type="email"
          onChange={onChangeHandler}
          value={data.email}
          placeholder="Email Address"
        />
        <input
          required
          name="street"
          type="text"
          onChange={onChangeHandler}
          value={data.street}
          placeholder="Street"
        />
        <div className="multi-fields">
          <input
            required
            name="city"
            type="text"
            onChange={onChangeHandler}
            value={data.city}
            placeholder="City"
          />
          <input
            required
            name="state"
            type="text"
            onChange={onChangeHandler}
            value={data.state}
            placeholder="State"
          />
        </div>
        <div className="multi-fields">
          <input
            required
            name="zipcode"
            type="text"
            onChange={onChangeHandler}
            value={data.zipcode}
            placeholder="Zip Code"
          />
          <input
            required
            name="country"
            type="text"
            onChange={onChangeHandler}
            value={data.country}
            placeholder="Country"
          />
        </div>
        <input
          required
          name="phone"
          type="text"
          onChange={onChangeHandler}
          value={data.phone}
          placeholder="Phone"
        />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
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
        </div>
        <button type="submit">PROCEED TO PAYMENT</button>
      </div>
    </form>
  );
};

export default PlaceOrder;
