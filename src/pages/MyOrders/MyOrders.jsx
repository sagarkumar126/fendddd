import React, { useContext, useState, useEffect } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
  try {
    const response = await axios.post(
      url + "/api/order/userorders",
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log("API Response:", response.data);

    if (response.data.success && response.data.data?.length > 0) {
      setData(response.data.data);
    } else {
      setData([]); 
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
};


  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>

      <div className="container">
        {data.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          data.map((order, index) => (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="" />

              <div className="order-info">
                <p className="items">
                  {order.items.map((item, idx) => (
                    <span key={idx}>
                      {item.name} x {item.quantity}
                      {idx !== order.items.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </p>

                <p><b>Total Amount:</b> ₹{order.amount}</p>
                <p><b>Status:</b> {order.status}</p>
                <p><b>Date:</b> {new Date(order.date).toLocaleString()}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders;
